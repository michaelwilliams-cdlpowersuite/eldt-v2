import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { ReactComponent as Logo } from "../../../assets/eldt_white.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../auth/AuthProvider";

interface RegistrationAppBarProps {}

const RegistrationAppBar: React.FC<RegistrationAppBarProps> = () => {
  const { clearAuthentication } = useAuth();
  const handleLogout = () => {
    clearAuthentication();
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Container
          disableGutters
          sx={{
            display: "flex",
            alignItems: "space-between",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <Logo style={{ height: "40px", marginRight: "8px" }} />
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
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
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={handleLogout}
                color="inherit"
                aria-label="Logout"
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default RegistrationAppBar;
