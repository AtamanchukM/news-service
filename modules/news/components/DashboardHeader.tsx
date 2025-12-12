"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#9ca3af" }}>
          {subtitle}
        </Typography>
      </Box>
      <Link href="/dashboard/news/new" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Нова новина
        </Button>
      </Link>
    </Box>
  );
}
