"use client";

import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
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
      {message}
    </Box>
  );
}
