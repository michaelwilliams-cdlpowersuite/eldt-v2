import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { ReactComponent as Logo } from "../assets/eldt.svg";

interface RegistrationAppBarProps {}

const RegistrationAppBar: React.FC<RegistrationAppBarProps> = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "secondary.main" }}>
      <Toolbar>
        <Container
          maxWidth="md"
          disableGutters
          sx={{
            display: "flex",
            alignItems: "space-between",
            justifyContent: "space-between",
          }}
        >
          <Logo style={{ height: "40px", marginRight: "8px" }} />
          <Box display="flex" alignItems="center">
            <LocalPhoneIcon />
            <a
              href="tel:+15092413987"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="overline" sx={{ pl: 1 }}>
                (509) 241-3987
              </Typography>
            </a>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default RegistrationAppBar;
