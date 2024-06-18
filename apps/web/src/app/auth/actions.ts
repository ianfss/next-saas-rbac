'use server'

import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
  const gitHubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  gitHubSignInURL.searchParams.set('client_id', 'Ov23li03LyB7mft7Ol3r')
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
  googleSignInURL.searchParams.set(
    'client_id',
    '348931462819-it5f5hraoh12pc00qpr9arlaui5ocobr.apps.googleusercontent.com',
  )
  googleSignInURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback/google',
  )

  redirect(googleSignInURL.toString())
}
