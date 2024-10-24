import { Box, Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface DailyPlannerProps {}

const DailyPlanner: React.FC<DailyPlannerProps> = () => {
  const handleSnack = () => {
    enqueueSnackbar("That was easy!", {
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
      variant: "success",
      autoHideDuration: 2000,
    });
  };
  return (
    <>
      <div>Daily Planner</div>
      <Box sx={{ height: "200px" }} />
      <Button onClick={handleSnack}>Submit</Button>
    </>
  );
};

export default DailyPlanner;
