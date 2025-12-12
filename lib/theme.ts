import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    secondary: {
      main: "#ef4444",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: '"Geist", sans-serif',
  },
});
