'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
  const gitHubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  gitHubSignInURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  gitHubSignInURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback/github',
  )
  gitHubSignInURL.searchParams.set('scope', 'user')

  redirect(gitHubSignInURL.toString())
}

export async function signInWithGoogle() {
  const googleSignInURL = new URL(
    'o/oauth2/auth',
    'https://accounts.google.com',
  )

  googleSignInURL.searchParams.set('response_type', 'code')
  googleSignInURL.searchParams.set(
    'scope',
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  )
  googleSignInURL.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
  googleSignInURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback/google',
  )

  redirect(googleSignInURL.toString())
}
