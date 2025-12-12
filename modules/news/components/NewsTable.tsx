"use client";

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Chip, Box } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewsItem } from "@/modules/news/services/queries";

interface NewsTableProps {
  news: NewsItem[];
  onDelete?: (id: string) => void;
}

export function NewsTable({ news, onDelete }: NewsTableProps) {
  const formatDate = (value: NewsItem["date"]) => {
    if (value instanceof Date) return value.toLocaleDateString("uk-UA");
    const tsToDate = (value as any)?.toDate?.();
    if (tsToDate instanceof Date) return tsToDate.toLocaleDateString("uk-UA");
    if (typeof value === "string" || typeof value === "number")
      return new Date(value).toLocaleDateString("uk-UA");
    return new Date().toLocaleDateString("uk-UA");
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#0a0a0a" }}>
            <TableCell sx={{ color: "#d1d5db", fontWeight: "bold" }}>Заголовок</TableCell>
            <TableCell sx={{ color: "#d1d5db", fontWeight: "bold" }}>Категорія</TableCell>
            <TableCell sx={{ color: "#d1d5db", fontWeight: "bold" }}>Дата</TableCell>
            <TableCell sx={{ color: "#d1d5db", fontWeight: "bold" }}>Статус</TableCell>
            <TableCell sx={{ color: "#d1d5db", fontWeight: "bold" }} align="right">
              Дії
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {news.map((newsItem) => (
            <TableRow
              key={newsItem.id}
              sx={{
                "&:hover": { backgroundColor: "#262626" },
                borderBottom: "1px solid #333",
              }}
            >
              <TableCell sx={{ color: "#d1d5db" }}>
                <Link href={`/news/${newsItem.id}`} style={{ textDecoration: "none", color: "#3b82f6" }}>
                  {newsItem.title}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#9ca3af" }}>{newsItem.category}</TableCell>
              <TableCell sx={{ color: "#9ca3af" }}>
                {formatDate(newsItem.date)}
              </TableCell>
              <TableCell>
                <Chip
                  label={newsItem.status === "published" ? "Опублікована" : "Чернетка"}
                  color={newsItem.status === "published" ? "success" : "warning"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Link href={`/dashboard/news/new/${newsItem.id}/edit`} style={{ textDecoration: "none" }}>
                  <IconButton
                    size="small"
                    sx={{ color: "#3b82f6", "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)" } }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Link>
                <IconButton
                  size="small"
                  sx={{ color: "#ef4444", "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" } }}
                  onClick={() => {
                    if (onDelete && newsItem.id) {
                      if (confirm("Ви впевнені?")) {
                        onDelete(newsItem.id);
                      }
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
