import { Box, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../../../api/studentApi";
import { columns } from "./gridColDef";

const Students = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isLoading) {
    return (
      <Box p={2} style={{ height: 600, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Loading Students...
        </Typography>
        <Skeleton variant="rectangular" width="100%" height={500} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2} style={{ height: 600, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>
      <DataGrid rows={data} columns={columns} />
    </Box>
  );
};

export default Students;
