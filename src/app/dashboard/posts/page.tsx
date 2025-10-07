import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const PostsDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Posts Dashboard</h1>
      <Link href={"posts/new"}>Add Post</Link>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg mb-4">
              {post.imageCover ? (
                <Image
                  src={post.imageCover ? post.imageCover : ""}
                  alt={post.title}
                  fill
                />
              ) : (
                <div className="absolute inset-0 bg-muted/80" />
              )}
            </div>
            <h2>{post.title}</h2>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsDashboard;
