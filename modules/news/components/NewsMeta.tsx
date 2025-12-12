"use client";

import { Typography, Box } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

interface NewsMetaProps {
  author: string;
  date: Date | string;
  category: string;
}

export function NewsMeta({ author, date, category }: NewsMetaProps) {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return (
    <Box
      sx={{
        mb: 4,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CalendarTodayOutlinedIcon sx={{ color: "#6b7280", fontSize: "1.2rem" }} />
        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
          {dateObj.toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PersonOutlinedIcon sx={{ color: "#6b7280", fontSize: "1.2rem" }} />
        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
          {author}
        </Typography>
      </Box>
    </Box>
  );
}
