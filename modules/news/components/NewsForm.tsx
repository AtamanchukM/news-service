"use client";

import { useState, ReactNode } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export interface NewsFormData {
  title: string;
  category: string;
  description: string;
  content: string;
  status?: "draft" | "published";
}

interface NewsFormProps {
  initialData?: NewsFormData;
  loading?: boolean;
  error?: string | null;
  onSubmit: (data: NewsFormData) => Promise<void>;
  title: string;
  subtitle: string;
  backLink: string;
  submitButtonText?: string;
}

export function NewsForm({
  initialData,
  loading = false,
  error = null,
  onSubmit,
  title,
  subtitle,
  backLink,
  submitButtonText = "Опублікувати",
}: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      title: "",
      category: "",
      description: "",
      content: "",
      status: "draft",
    }
  );
  const [localError, setLocalError] = useState<string | null>(error);
  const [isLoading, setIsLoading] = useState(loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsLoading(true);

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setLocalError(err?.message || "Помилка при збереженні новини");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <Link href={backLink} style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: "#3b82f6" }}>
          Повернутися
        </Button>
      </Link>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#9ca3af" }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Error Message */}
      {localError && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#7f1d1d",
            border: "1px solid #991b1b",
            borderRadius: "8px",
            color: "#fca5a5",
          }}
        >
          {localError}
        </Box>
      )}

      {/* Form Card */}
      <Card
        sx={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          p: 3,
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Title */}
          <TextField
            fullWidth
            label="Заголовок новини"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Введіть заголовок"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#d1d5db",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
              },
            }}
          />

          {/* Category */}
          <TextField
            fullWidth
            label="Категорія"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Напр.: Технологія, Web Development"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#d1d5db",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
              },
            }}
          />

          {/* Status */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#9ca3af" }}>Статус</InputLabel>
            <Select
              name="status"
              value={formData.status || "draft"}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as "draft" | "published",
                }));
              }}
              label="Статус"
              sx={{
                color: "#d1d5db",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#444",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666",
                },
                "& .MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
            >
              <MenuItem value="draft">📝 Чернетка (Draft)</MenuItem>
              <MenuItem value="published">📰 Опубліковано (Published)</MenuItem>
            </Select>
          </FormControl>

          {/* Description */}
          <TextField
            fullWidth
            label="Короткий опис"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={2}
            placeholder="Введіть короткий опис (буде показано в списку новин)"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#d1d5db",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
              },
            }}
          />

          {/* Content */}
          <TextField
            fullWidth
            label="Повний текст новини"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            multiline
            rows={8}
            placeholder="Введіть повний текст статті"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#d1d5db",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
              },
            }}
          />

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={isLoading}
              sx={{ flex: 1 }}
            >
              {isLoading ? "Збереження..." : submitButtonText}
            </Button>
            <Link href={backLink} style={{ textDecoration: "none", flex: 1 }}>
              <Button fullWidth variant="outlined" sx={{ color: "#9ca3af", borderColor: "#444" }}>
                Скасувати
              </Button>
            </Link>
          </Box>
        </form>
      </Card>
    </>
  );
}
