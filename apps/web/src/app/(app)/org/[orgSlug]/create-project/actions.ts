'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createProject } from '@/http/create-project'

const projectSchema = z.object({
  name: z.string().min(3, { message: 'Please include at least 3 characters.' }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await createProject({
      name,
      description,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again later.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Succesfully saved the project.',
    errors: null,
  }
}
