import { Container, Box, Button } from "@mui/material";
import Link from "next/link";
import { getNewsById } from "@/modules/news/services/newsService";
import {
  NewsDetailHeader,
  NewsContent,
  NewsMeta,
  AuthorCard,
  ErrorMessage,
} from "@/modules/news/components";

type PageProps = { params: Promise<{ id: string }> };

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  let news = null;
  let error: string | null = null;

  try {
    news = await getNewsById(id);
  } catch (err: any) {
    console.error("Error loading news:", err);
    error = "Помилка при завантаженні новини";
  }

  if (!news && !error) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <h1>Новину не знайдено</h1>
        <Link href="/news" style={{ textDecoration: "none" }}>
          <Button variant="contained">Повернутися до новин</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <NewsDetailHeader />

      {error && <ErrorMessage message={error} />}

      {news && (
        <>
          <NewsContent
            title={news.title}
            category={news.category}
            content={news.content}
          />

          <NewsMeta
            author={news.author}
            date={news.date}
            category={news.category}
          />
          <AuthorCard
            name={news.author}
            description="Автор статей про веб-розробку та сучасні технології"
          />

          {/* Back to news button */}
          <Box sx={{ mt: 4 }}>
            <Link href="/news" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Переглянути всі новини
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
}
