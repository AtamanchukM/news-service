"use client";

import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
import { getUserNews, deleteNews } from "@/modules/news/services/newsService";
import { DashboardHeader, NewsTable, ErrorMessage } from "@/modules/news/components";
import { NewsItem } from "@/modules/news/services/queries";

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (!data?.user) {
          redirect("/login");
        }
        setSession(data);

        // Завантажити новини користувача
        const userId = (data.user as any).uid;
        if (userId) {
          const userNews = await getUserNews(userId);
          console.log("User news loaded:", userNews);
          setNews(userNews);
        }
      } catch (err: any) {
        console.error("Error:", err);
        setError("Помилка при завантаженні даних");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id);
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      setError("Помилка при видаленні новини");
    }
  };

  if (loading) {
    return <Container sx={{ py: 4, textAlign: "center" }}>Завантаження...</Container>;
  }

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardHeader title="Мої Новини" subtitle="Керуйте своїми опублікованими та чернетками новинами" />

      {error && <ErrorMessage message={error} />}

      <NewsTable news={news} onDelete={handleDelete} />
    </Container>
  );
}

