import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type BannerProps = {
  slug: string;
  title: string;
  createdAt: Date;
  imageCover?: string;
  content: string;
  author: string;
};

const Banner = ({
  title,
  slug,
  imageCover,
  content,
  author,
  createdAt,
}: BannerProps) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group w-full h-full flex-col sm:flex-row flex gap-4 lg:gap-8 items-center justify-center mt-3 md:mt-5 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden">
        <Image
          src={imageCover as string}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500 ease-in-out"
          sizes="100vw"
          priority
        />
      </div>

      <div className="flex w-full h-full flex-1 flex-col justify-between gap-3 lg:gap-8 p-2">
        <h2 className="font-bold text-3xl md:text-5xl text-blue-600">
          {title}
        </h2>
        <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left">
          {content.slice(0, 300) + "..."}
        </p>
        <div>
          {author && (
            <p className="text-sm text-muted-foreground">Por {author}</p>
          )}
          <p className="text-zinc-600 text-xs md:text-sm">
            {format(new Date(createdAt), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Banner;
