import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import googleIcon from '@/assets/google-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Name</Label>
        <Input id="name" name="name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm password</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
        />
      </div>
      <Button type="submit" className="w-full">
        Sign up
      </Button>
      <Button type="button" variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-in">Already have an account? Sign in</Link>
      </Button>
      <Separator />
      <Button type="button" variant="outline" className="w-full">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Sign up with GitHub
      </Button>
      <Button type="button" variant="outline" className="w-full">
        <Image src={googleIcon} className="mr-2 size-4" alt="" />
        Sign up with Google
      </Button>
    </form>
  )
}
