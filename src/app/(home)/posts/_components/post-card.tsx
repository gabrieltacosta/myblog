import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

// Define the Post type or import it from your models/types file
interface PostCardProps {
  slug: string;
  title: string;
  createdAt: Date;
  imageCover?: string;
  content: string;
  author: string;
}

export default function PostCard({
  slug,
  title,
  createdAt,
  imageCover,
  content,
  author,
}: PostCardProps) {
  return (
    <Card className="group relative pt-0 overflow-hidden hover:shadow-xl dark:shadow-white/10 transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={title}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
        {imageCover ? (
          <Image
            src={imageCover as string}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-muted/80" />
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(createdAt), "dd MMM, yyyy", {
                locale: ptBR,
              })}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {content.slice(0, 100) + "..."}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {author && (
            <p className="text-sm text-muted-foreground">Por {author}</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
