import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main>
      <div>
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div>
      {latestPost ? (
        <p>Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
