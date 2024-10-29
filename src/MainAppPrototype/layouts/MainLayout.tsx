import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import { brandColors } from "../../styles/brandColors";
import mainNavItems from "./mainNavItems";

const drawerWidth = 250;
const toolbarHeight = 100;
const textShadow = "rgba(0, 0, 0, 0.5) 1px 1px 2px";

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: brandColors.cdlDarkBlue,
        }}
      >
        <Toolbar sx={{ height: toolbarHeight }}>
          <Typography variant="h6" noWrap component="div"></Typography>
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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            bgcolor: "white",
          }}
        >
          <Box
            component="img"
            sx={{
              height: toolbarHeight,
              width: drawerWidth,
            }}
            alt="CDL Professional Solutions Logo"
            src="cdl_ps_logo_720.png"
          />
        </Toolbar>
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
                sx={{
                  textShadow: textShadow,
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "38px",
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
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              {/* Loop over the subnav items */}
              {nav.subNav && (
                <List component="div" disablePadding>
                  {nav.subNav.map((subNavItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      sx={{
                        pl: 4,
                        py: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textShadow: textShadow,
                      }}
                    >
                      <ListItemText
                        primary={subNavItem.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "white",
                            fontWeight: "normal",
                          },
                        }}
                      />
                      <ListItemText
                        inset
                        primary={Math.floor(Math.random() * 2001)}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "white",
                            fontWeight: "normal",
                            textAlign: "right",
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
                  borderColor: brandColors.cdlDarkBlue,
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
