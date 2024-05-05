import { cookies } from 'next/headers'

import { CreatePost } from '~/app/_components/create-post'
import { api } from '~/trpc/server'
import { createClient } from '~/utils/supabase/server'

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const cookieStore = cookies()

  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log('user', user)

  if (!user)
    return (
      <main>
        <div>Sign up here</div>
      </main>
    )

  return (
    <main>
      <div>
        <CrudShowcase />
      </div>
    </main>
  )
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest()

  return (
    <div>
      {latestPost ? <p>Your most recent post: {latestPost.name}</p> : <p>You have no posts yet.</p>}

      <CreatePost />
    </div>
  )
}
