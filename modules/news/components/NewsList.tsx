"use client";

import { Box, Typography } from "@mui/material";
import { NewsItem } from "@/modules/news/services/queries";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  news: NewsItem[];
}

export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "#6b7280", mb: 2 }}>
          Новин поки немає
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 3,
      }}
    >
      {news.map((newsItem) => (
        <Box key={newsItem.id} sx={{ height: "100%" }}>
          <NewsCard news={newsItem} />
        </Box>
      ))}
    </Box>
  );
}
