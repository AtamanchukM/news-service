"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const userEmail = session?.user?.email;
  const userRole = (session?.user as any)?.role || "user";
  console.log(userRole);

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #333" }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#3b82f6" }}
            >
              📰 News
            </Typography>
          </Link>

          {/* Menu Links */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Link href="/news" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#d1d5db",
                  "&:hover": { color: "white" },
                  cursor: "pointer",
                }}
              >
                Новини
              </Typography>
            </Link>

            <Link href="/dashboard/news" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#d1d5db",
                  "&:hover": { color: "white" },
                  cursor: "pointer",
                }}
              >
                Dashboard
              </Typography>
            </Link>

            {userRole === "admin" && (
              <Link href="/adminPage" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#d1d5db",
                    "&:hover": { color: "white" },
                    cursor: "pointer",
                  }}
                >
                  Admin Page
                </Typography>
              </Link>
            )}

            {/* Auth Buttons */}
            {isAuthed ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  {userEmail}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  endIcon={<LogoutIcon />}  
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  Вихід
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Button variant="text" size="small" sx={{ color: "#d1d5db" }}>
                    Вхід
                  </Button>
                </Link>
                <Link href="/register" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="small">
                    Реєстрація
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
