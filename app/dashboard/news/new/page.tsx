"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { createNews } from "@/modules/news/services/newsService";
import { NewsForm, NewsFormData } from "@/modules/news/components";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function CreateNewsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(!session);

  useEffect(() => {
    if (session === null) {
      redirect("/login");
    }
  }, [session]);

  if (!session) {
    return null;
  }

  const handleSubmit = async (data: NewsFormData) => {
    try {
      const newsData = {
        title: data.title,
        category: data.category,
        description: data.description,
        content: data.content,
        authorId: (session.user as any).uid || "",
        author: session.user?.name || "Unknown",
        status: (data.status || "draft") as "draft" | "published",
      };

      await createNews(newsData);
      router.push("/dashboard/news");
    } catch (error) {
      console.error("Помилка при створенні новини:", error);
      throw error;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <NewsForm
        title="Створити нову новину"
        subtitle="Заповніть форму для публікації нової новини"
        backLink="/dashboard/news"
        onSubmit={handleSubmit}
        submitButtonText="Опублікувати"
      />
    </Container>
  );
}
