import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="max-w-3xl mx-auto prose dark:prose-invert">
        {post.imageCover && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageCover as string}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <time>
              {format(new Date(post.createdAt), "dd MMMM, yyyy", { locale: ptBR })}
            </time>
            {post.author && <span>Por {post.author.name}</span>}
          </div>

          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {post.title}
          </h1>
        </header>

        <div className="max-w-none">{post.content}</div>
      </article>
    </>
  );
};

export default PostPage;
