import { QueryClient } from '@tanstack/react-query'
export type RouterContext = { queryClient: QueryClient }

export type Idea = {
  id: string
  title: string
  summary: string
  description: string
  tags: string[]
  createdAt: string
  user: string
}
