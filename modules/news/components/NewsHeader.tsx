"use client";

import { Box, Typography } from "@mui/material";

interface NewsHeaderProps {
  title: string;
  subtitle: string;
}

export function NewsHeader({ title, subtitle }: NewsHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: "#9ca3af" }}>
        {subtitle}
      </Typography>
    </Box>
  );
}
