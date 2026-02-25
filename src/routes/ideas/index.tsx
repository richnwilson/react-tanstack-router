import { createFileRoute, Link } from '@tanstack/react-router'
import { getIdeas } from '@/api/json-server'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { Idea } from '@/types'

// Using tanStack query is more work, but more options i.e. caching, prefetch, suspense loading
const IdeasQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: async () => await getIdeas(),
  })

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'Browse ideas',
      },
    ],
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(IdeasQueryOptions())
  },
})

function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(IdeasQueryOptions())
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>💡Ideas</h1>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {ideas.map((i: Idea) => (
          <li
            key={i.id}
            className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'
          >
            <div>
              <h2 className='text-lg font-semibold'>{i.title}</h2>
              <p className='text-gray-700 mt-2'>{i.summary}</p>
            </div>
            <Link
              to='/ideas/$id'
              params={{ id: i.id.toString() }}
              className='text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            >
              → View Idea
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
