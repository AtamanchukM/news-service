"use client";

import { Typography, Box, Divider } from "@mui/material";

interface NewsContentProps {
  title: string;
  category: string;
  content: string;
}

export function NewsContent({ title, category, content }: NewsContentProps) {
  return (
    <>
      {/* Category Badge */}
      <Typography
        variant="caption"
        sx={{
          display: "inline-block",
          px: 1.5,
          py: 0.75,
          mb: 2,
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        {category}
      </Typography>

      {/* Title */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {title}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Article Content */}
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          color: "#d1d5db",
          mb: 4,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Typography>

      <Divider sx={{ my: 4 }} />
    </>
  );
}
