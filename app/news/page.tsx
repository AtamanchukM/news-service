import { Container } from "@mui/material";
import { getAllPublishedNews } from "@/modules/news/services/newsService";
import { NewsHeader, NewsList, ErrorMessage } from "@/modules/news/components";

export default async function NewsPage() {
  let news: any[] = [];
  let error: string | null = null;

  try {
    news = await getAllPublishedNews();
    console.log("News loaded:", news);
  } catch (err: any) {
    console.error("Error loading news:", err);
    error = "Помилка при завантаженні новин";
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NewsHeader
        title="Всі Новини"
        subtitle="Найсвіжіші новини з світу технологій та веб-розробки"
      />

      {error && <ErrorMessage message={error} />}

      <NewsList news={news} />
    </Container>
  );
}
