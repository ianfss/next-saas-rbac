import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGitHub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with GitHub.',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const gitHubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      gitHubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      gitHubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET,
      )
      gitHubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_REDIRECT_URI,
      )
      gitHubOAuthURL.searchParams.set('code', code)

      const gitHubAccessTokenResponse = await fetch(gitHubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const gitHubAccessTokenData = await gitHubAccessTokenResponse.json()

      const { access_token: gitHubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(gitHubAccessTokenData)

      const gitHubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${gitHubAccessToken}`,
        },
      })

      const gitHubUserData = await gitHubUserResponse.json()

      const {
        id: gitHubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        })
        .parse(gitHubUserData)

      if (email === null) {
        throw new BadRequestError(
          'Your GitHub account must have an email to authenticate.',
        )
      }

      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: gitHubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
