import prisma from "@/lib/prisma";
import PostCard from "./_components/post-card";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Bem-vindo ao Blog da Irmandade do Santíssimo Sacramento!
        </h1>
        <p className="text-lg text-muted-foreground">
          Aqui mergulhamos juntos na riqueza da Eucaristia, fonte e centro da
          vida cristã.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            createdAt={post.createdAt}
            imageCover={post.imageCover ? post.imageCover : ""}
            content={post.content}
            author={post.author.name}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
