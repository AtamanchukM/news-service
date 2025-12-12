"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NewsItem } from "@/modules/news/services/queries";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const publishedDate =
    news.date instanceof Date
      ? news.date
      : (news.date as any)?.toDate?.() ?? new Date();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(59, 130, 246, 0.2)",
          borderColor: "#3b82f6",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Category Badge */}
        <Typography
          variant="caption"
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.5,
            mb: 1,
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {news.category}
        </Typography>

        {/* Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          {news.title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" sx={{ color: "#d1d5db", mb: 2 }}>
          {news.description}
        </Typography>

        {/* Meta */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {news.author}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {publishedDate.toLocaleDateString("uk-UA")}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Link
          href={`/news/${news.id}`}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "#3b82f6",
              "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)" },
            }}
          >
            Читати далі
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
