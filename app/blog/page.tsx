import { auth } from '@clerk/nextjs/server'

export default async function Blog() {
  const { has } = await auth()

  const isAwesomeUser = has({ plan: 'you_are_awesome' })

  if (!isAwesomeUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-lg text-gray-700">
          This page is only available to users on the <strong>You're Awesome</strong> plan.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Blog</h1>
      <p className="mt-4 text-lg">
        This is a blog section where you can read articles and updates.
      </p>

      <div className="mt-8 w-full">
        <p>Blog content will be added here soon!</p>
      </div>
    </div>        
  )
}
