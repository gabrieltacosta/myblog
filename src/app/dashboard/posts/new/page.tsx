"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório!"),
  content: z.string().min(100, "Conteúdo deve conter no mínimo 100 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function NewPost() {
    const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Estado para exibir erros da API para o usuário
  const [serverError, setServerError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  


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
    const imageCover = await convertImageToBase64(image as File);
    setServerError(null); // Limpa erros anteriores
    try {
      // A Server Action agora pode retornar um objeto com sucesso ou erro
      const result = await createPost({ ...data, imageCover});

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

          <div className="grid gap-2">
                <Label htmlFor="image">Imagem de perfil (opcional)</Label>
                <div className="flex items-end gap-4">
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    {imagePreview && (
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

          {serverError && (
            <p className="text-sm font-medium text-red-500">{serverError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting} // Desabilita o botão durante o envio
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Criando Post..." : "Criar Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}