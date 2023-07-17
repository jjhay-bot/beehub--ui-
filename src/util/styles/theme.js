import { createTheme, styled, TextField } from "@mui/material";

export const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#242424",
      light: "#4f4f4f",
      dark: "#191919",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d5d5d5",
      light: "#959595",
      dark: "#dddddd",
      contrastText: "#191919",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: `9px`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `8px`,
          border: "white 1px solid",
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input:-internal-autofill-selected": {
            background: "none",
          },
          "&.Mui-focused fieldset": {
            border: "1px #fff !important",
          },
        },
      },
    },
  },
});

export const themeForm = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "1px solid #000",
          borderRadius: `0.65rem`,
          padding: 200,
          outline: "none",
          background: "#FFFFFF",
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input:-internal-autofill-selected": {
            background: "none",
            outline: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1.25px solid #000",
            outline: "none",
          },
          "& input": {
            padding: "1.5px 8px",
            height: "100%",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: `12px`,
          borderWidth: "2px",
          "&.Mui-focusVisible &:hover": {
            borderWidth: "2px",
          },
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: `12px`,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#242424",
      light: "#4f4f4f",
      dark: "#191919",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d5d5d5",
      light: "#959595",
      dark: "#dddddd",
      contrastText: "#191919",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    color: "#6E7191",
  },
});

export const themeSecondary = createTheme({
  palette: {
    primary: {
      main: "#07A69C",
      light: "#4db6ac",
      dark: "#009688",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#71cab7",
      main: "#ffffff",
      dark: "#006a5a",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #eee",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "90%",
  overflowY: "auto",
};

export const paginationStyle = {
  p: 2.5,
  display: "flex",
  justifyContent: "space-between",
  color: "#212121",
  fontWeight: "400",
  fontSize: 12,
};

export const stylesAccountDeviceModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #eee",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "90%",
  overflow: "auto",
};

export const SearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
  input: {
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
  },
}));

export const themeSidebar = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 12,
  },
});
