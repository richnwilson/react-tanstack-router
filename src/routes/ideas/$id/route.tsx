import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className='text-red-400 border border-dashed p-4'>
        Can wrap any routes in here and beneath with custom styles around the
        Outlet object in route.tsx
      </div>
      <Outlet />
    </div>
  )
}
