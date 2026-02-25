import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  useMutation,
  useSuspenseQuery,
  queryOptions,
} from '@tanstack/react-query'

import { getIdea, updateIdea } from '@/api/json-server'

const IdeaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['idea', id],
    queryFn: async () => await getIdea(id),
  })

export const Route = createFileRoute('/ideas/$id/edit')({
  component: IdeaEditPage,
  loader: async ({ params: { id }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(IdeaQueryOptions(id))
  },
})

function IdeaEditPage() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(IdeaQueryOptions(id))

  const [state, setState] = useState(() => {
    return {
      title: data.title,
      summary: data.summary,
      description: data.description,
      tags: data.tags.join(', '),
    }
  })

  const { title, summary, description, tags } = state

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(id, {
        title,
        summary,
        description,
        tags: tags
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      navigate({ to: '/ideas/$id', params: { id } })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add validation of form in production
    try {
      await mutateAsync()
    } catch (e) {
      console.error(e)
      // Show error
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center-mb-4'>
        <h1 className='text-2xl font-bold'>✏️ Edit Idea</h1>
        <Link
          to='/ideas/$id'
          params={{ id }}
          className='text-sm text-blue-600 hover:underline'
        >
          ← Back to idea
        </Link>
      </div>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setState((p) => ({ ...p, title: e.target.value }))}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea title'
          />
        </div>

        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            id='summary'
            type='text'
            value={summary}
            onChange={(e) =>
              setState((p) => ({ ...p, summary: e.target.value }))
            }
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea summary'
          />
        </div>

        <div>
          <label
            htmlFor='body'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='body'
            value={description}
            onChange={(e) =>
              setState((p) => ({ ...p, description: e.target.value }))
            }
            rows={6}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write out the description of your idea'
          />
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            id='tags'
            type='text'
            value={tags}
            onChange={(e) => setState((p) => ({ ...p, tags: e.target.value }))}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='optional tags, comma separated'
          />
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            disabled={isPending}
            className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Saving...' : '💾 Save Idea'}
          </button>
        </div>
      </form>
    </div>
  )
}
