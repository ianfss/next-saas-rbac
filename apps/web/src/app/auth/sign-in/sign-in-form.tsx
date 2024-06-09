'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import googleIcon from '@/assets/google-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [{ errors, message, success }, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    { success: false, message: null, errors: null },
  )
  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text" />
        {errors?.email && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
        {errors?.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign in'}
      </Button>
      <Button type="button" variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-up">Create an account</Link>
      </Button>
      <Separator />
      <Button type="button" variant="outline" className="w-full">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Sign in with GitHub
      </Button>
      <Button type="button" variant="outline" className="w-full">
        <Image src={googleIcon} className="mr-2 size-4" alt="" />
        Sign in with Google
      </Button>
    </form>
  )
}
