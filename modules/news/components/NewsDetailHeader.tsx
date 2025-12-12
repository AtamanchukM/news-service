"use client";

import { Container, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface NewsDetailHeaderProps {
  onBack?: () => void;
}

export function NewsDetailHeader({ onBack }: NewsDetailHeaderProps) {
  return (
    <Box>
      <Link href="/news" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: "#3b82f6" }}>
          Повернутися до новин
        </Button>
      </Link>
    </Box>
  );
}
