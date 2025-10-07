"use client";

import { useState } from "react";
import { createPost } from "./_actions";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório!"),
  content: z.string().min(100, "Conteúdo deve conter no mínimo 100 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function NewPost() {
  // Estado para exibir erros da API para o usuário
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Extrai o estado de `isSubmitting` do formulário
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormSchema) => {
    setServerError(null); // Limpa erros anteriores
    try {
      // A Server Action agora pode retornar um objeto com sucesso ou erro
      const result = await createPost({ ...data });

      if (result?.error) {
        setServerError(result.error);
        return;
      }

      // O redirect vai acontecer na action, então o reset não é estritamente necessário,
      // mas é uma boa prática caso você remova o redirect no futuro.
      form.reset();
    } catch (error) {
      // Captura erros inesperados
      setServerError("Ocorreu um erro inesperado. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título..."
                    {...field}
                    disabled={isSubmitting} // Desabilita durante o envio
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva o conteúdo do post..."
                    {...field}
                    disabled={isSubmitting} // Desabilita durante o envio
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && (
            <p className="text-sm font-medium text-red-500">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting} // Desabilita o botão durante o envio
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Criando Post..." : "Criar Post"}
          </button>
        </form>
      </Form>
    </div>
  );
}
