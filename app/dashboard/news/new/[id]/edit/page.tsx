"use client";

import { Container } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  getNewsById,
  updateNews,
} from "@/modules/news/services/newsService";
import { NewsForm, NewsFormData } from "@/modules/news/components";
import { ErrorMessage } from "@/modules/news/components";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [initialNews, setInitialNews] = useState<NewsFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const newsId = params.id as string;

  useEffect(() => {
    if (session === null) {
      redirect("/login");
    }
  }, [session]);

  useEffect(() => {
    const fetchNews = async () => {
      if (!newsId) return;
      try {
        const news = await getNewsById(newsId);
        if (!news) {
          setError("Новину не знайдено");
          return;
        }
        // Перевірити, що користувач є автором
        if (news.authorId !== (session?.user as any)?.uid) {
          setError("Ви не маєте прав редагувати цю новину");
          return;
        }
        setInitialNews({
          title: news.title,
          category: news.category,
          description: news.description,
          content: news.content,
        });
      } catch (err: any) {
        setError(err?.message || "Помилка при завантаженні новини");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchNews();
    }
  }, [newsId, session]);

  if (!session) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (error || !initialNews) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ErrorMessage message={error || "Не вдалося завантажити новину"} />
      </Container>
    );
  }

  const handleSubmit = async (data: NewsFormData) => {
    try {
      await updateNews(newsId, {
        title: data.title,
        category: data.category,
        description: data.description,
        content: data.content,
        status: (data.status || "draft") as "draft" | "published",
      });
      router.push("/dashboard/news");
    } catch (error) {
      console.error("Помилка при оновленні новини:", error);
      throw error;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <NewsForm
        title="Редагувати новину"
        subtitle="Оновіть інформацію про новину"
        backLink="/dashboard/news"
        initialData={initialNews}
        onSubmit={handleSubmit}
        submitButtonText="Зберегти зміни"
      />
    </Container>
  );
}
