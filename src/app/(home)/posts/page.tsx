import prisma from "@/lib/prisma";
import PostCard from "./_components/post-card";
import Banner from "./_components/Banner";

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

  const { title, slug, imageCover, content, author, createdAt } = posts[0];

  return (
    <div className="container mx-auto p-6">
      {posts.length > 0 && (
        <Banner
          slug={slug}
          title={title}
          createdAt={createdAt}
          content={content}
          author={author.name}
          imageCover={imageCover ? imageCover : ""}
        />
      )}

      <div className="flex flex-col w-full mx-auto md:justify-between items-center sm:grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-4 lg:mt-12">
        {posts.slice(1).map((post) => (
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
