import {
  DirectionsCar,
  LocalShipping,
  List,
  Assignment,
} from "@mui/icons-material";
import { Box } from "@mui/material";

// Define columns for the DataGrid
export const columns = [
  {
    field: "icons",
    headerName: "Status Icons",
    width: 200,
    renderCell: () => (
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <DirectionsCar style={{ color: "#ffc107", fontSize: 30 }} />
        <LocalShipping style={{ color: "#28a745", fontSize: 30 }} />
        <List style={{ color: "#dc3545", fontSize: 30 }} />
        <Assignment style={{ color: "#dc3545", fontSize: 30 }} />
      </Box>
    ),
  },
  {
    field: "fullName",
    headerName: "Name",
    valueGetter: (value: any, row: any) => {
      return `${row.user.firstName || ""} ${row.user.lastName || ""}`;
    },
  },
  {
    field: "driversLicense",
    headerName: "Driver's License",
  },
];
