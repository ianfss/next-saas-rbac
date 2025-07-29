import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae optio,
            ducimus beatae similique aliquam deserunt quod hic voluptatibus. Non
            accusamus, possimus nostrum vitae quo quas aperiam suscipit.
            Assumenda, asperiores. Tempore.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/ianfss.png" />
            <AvatarFallback />
          </Avatar>

          <span className="text-xs text-muted-foreground">
            Created by <span className="text-medium text-foreground">Ian</span>{' '}
            a day ago
          </span>

          <Button size="xs" variant="outline" className="ml-auto">
            View <ArrowRight className="size-3 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
