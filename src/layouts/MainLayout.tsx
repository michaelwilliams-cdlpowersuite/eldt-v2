import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import mainNavItems from "./mainNavItems";
import { brandColors } from "../shared/brandColors";

const drawerWidth = 250;
const toolbarHeight = 100;

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: brandColors.cdlDarkBlue,
        }}
      >
        <Toolbar sx={{ height: toolbarHeight }}>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: brandColors.cdlLightBlue,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ bgcolor: "pink", height: toolbarHeight }} />
        <Divider />
        <List>
          {/* Loop over the nav items */}
          {mainNavItems.map((nav, index) => (
            <React.Fragment key={index}>
              <ListItem
                key={index}
                component={RouterLink}
                to={nav.path}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    {nav.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={nav.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              {/* Loop over the subnav items */}
              {nav.subNav && (
                <List component="div" disablePadding>
                  {nav.subNav.map((subNavItem, subIndex) => (
                    <ListItem key={subIndex} sx={{ pl: 4 }}>
                      <ListItemText
                        inset
                        primary={subNavItem.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "white",
                            fontWeight: "normal",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Divider
                sx={{
                  border: 1,
                }}
              />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {/* Children of this route display here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
