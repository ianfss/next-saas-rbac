'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import googleIcon from '@/assets/google-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGitHub, signInWithGoogle } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <Label htmlFor="email">Name</Label>
          <Input id="name" name="name" />
          {errors?.name && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
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
        </div>
        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
          />
          {errors?.password_confirmation && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign up'}
        </Button>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="w-full"
          asChild
        >
          <Link href="/auth/sign-in">Already have an account? Sign in</Link>
        </Button>
      </form>
      <Separator />
      <form action={signInWithGitHub}>
        <Button type="submit" variant="outline" className="w-full">
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign up with GitHub
        </Button>
      </form>
      <form action={signInWithGoogle}>
        <Button type="submit" variant="outline" className="w-full">
          <Image src={googleIcon} className="mr-2 size-4" alt="" />
          Sign up with Google
        </Button>
      </form>
    </div>
  )
}
