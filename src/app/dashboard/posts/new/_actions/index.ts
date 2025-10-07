"use server"; // É uma boa prática adicionar "use server" no topo do arquivo

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import slugify from "slugify";

interface PostProps {
  title: string;
  content: string;
}

// Função para gerar um slug único
const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true, trim: true, locale: "pt-BR" });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Verifica se o slug já existe no banco de dados
  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    // Se existir, adiciona um contador ao final (ex: meu-post-2)
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};


export async function createPost({ title, content }: PostProps): Promise<{ error?: string }> {
  try {

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      // Retorna um erro estruturado em vez de lançar uma exceção
      return { error: "Não autorizado: você precisa estar logado." };
    }

    const slug = await generateUniqueSlug(title);

    await prisma.post.create({
      data: {
        title,
        content,
        slug,
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Falha ao criar post:", error);
    return { error: "Ocorreu um erro no servidor ao criar o post." };
  }

  // Se tudo der certo, revalide o cache e redirecione
  revalidatePath("/posts");
  redirect("/posts");
}
