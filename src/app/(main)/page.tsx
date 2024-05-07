import {CreatePost} from '~/components/create-post'
import {api} from '~/trpc/server'
import {createClient} from '~/utils/supabase/server'
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });

    const supabase = createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser()
    console.log('user', user)

    async function signOut() {
        'use server'
        const supabase = createClient()
        await supabase.auth.signOut()
        return redirect('/login')
    }

    if (!user)
        return (
            <main>
                <Link
                    href={"/login"}
                    className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
                >
                    Login
                </Link>
            </main>
        )
    return (<main>
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOut}>
                <button className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline">
                    Logout
                </button>
            </form>
        </div>
    </main>)
}

async function CrudShowcase() {
    const latestPost = await api.post.getLatest()

    return (
        <div>
            {latestPost ? <p>Your most recent post: {latestPost.name}</p> : <p>You have no posts yet.</p>}

            <CreatePost/>
        </div>
    )
}
