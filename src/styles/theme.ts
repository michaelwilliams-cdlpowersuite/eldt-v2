import { createTheme } from "@mui/material/styles";
import { brandColors } from "./brandColors";

export const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.cdlDarkBlue,
    },
    secondary: {
      main: brandColors.cdlLightBlue,
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});
