import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

const MobileOnly: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box sx={{ display: { xs: "flex", md: "none" }, width: "100%" }} {...props}>
    {children}
  </Box>
);

const DesktopOnly: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box sx={{ display: { xs: "none", md: "flex" }, width: "100%" }} {...props}>
    {children}
  </Box>
);

export { MobileOnly, DesktopOnly };
