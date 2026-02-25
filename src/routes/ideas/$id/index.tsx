import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { getIdea, deleteIdea } from '@/api/json-server'
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query'

// Using tanStack query is more work, but more options i.e. caching, prefetch, suspense loading
const IdeaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['idea', id],
    queryFn: async () => await getIdea(id),
  })

export const Route = createFileRoute('/ideas/$id/')({
  component: IdeaIdPage,
  loader: async ({ params: { id }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(IdeaQueryOptions(id))
  },
})

function IdeaIdPage() {
  // useSuspenseQuery handles the loading and isError so we don't have to worry about it
  const { id } = Route.useParams()
  const {
    data: { title, description },
  } = useSuspenseQuery(IdeaQueryOptions(id))

  const { mutateAsync: mutateDelete, isPending } = useMutation({
    mutationFn: () => deleteIdea(id),
    onSuccess: () => {
      navigate({ to: '/ideas' })
    },
  })

  const handleDelete = async () => {
    // In production, add pop-up to confirm first
    await mutateDelete()
  }

  const navigate = useNavigate()
  return (
    <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 block mb-4'>
        ← Back to Ideas
      </Link>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='mt-2'>{description}</p>
      <Link
        to='/ideas/$id/edit'
        params={{ id }}
        className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition '
      >
        ✏️ Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className='text-sm bg-red-600 text-white mt-4 px-4 py-2 rounded transition hover:bg-red-700 disabled:opacity:50'
      >
        {isPending ? 'Deleting ...' : '🗑️ Delete'}
      </button>
    </div>
  )
}
