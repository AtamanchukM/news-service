"use client";

import { Card, CardContent, Box, Avatar, Typography } from "@mui/material";

interface AuthorCardProps {
  name: string;
  description?: string;
}

export function AuthorCard({ name, description }: AuthorCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#3b82f6",
            fontSize: "1.5rem",
          }}
        >
          {name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          {description && (
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}
