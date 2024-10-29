import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface PersonalInfoProps {}

const PersonalInfo: React.FC<PersonalInfoProps> = () => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        Personal Info
      </Typography>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField required label="First Name" />
        <TextField required label="Last Name" />
      </Box>
    </Box>
  );
};

export default PersonalInfo;
