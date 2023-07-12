import { styled } from "@mui/material/styles";
import { Button, Stack, Box, Toolbar, List, ListItem } from "@mui/material";
import { ListItemButton, ListItemIcon, ListItemText, CssBaseline } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useWidth } from "../../util/useWidth";
import { startCase } from "lodash";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { authAction } from "../../store/auth/auth-slice";
import { useDispatch } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function AppDrawer({ children }) {
  const { width } = useWidth();
  const [open] = useState(true);
  const navigation  = useNavigation();
  const { setToken } = authAction;
  const dispatch = useDispatch();
  const active = (label) => {
    if (["supply_plan", "home"].includes(label)) {
      return true;
    } else return false;
    // path.match(snakeCase(label))
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: "#363636" }}>
        <Toolbar>
          <img src={'logo'} alt="logo" width={120} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={width > 500}>
        <DrawerHeader />
        <Stack justifyContent="space-between" minHeight="calc(100% - 5rem)">
          <List>
            {[
              { label: "home", icon: <HomeOutlinedIcon /> },
              // { label: "supply_plan", icon: <SettingsOutlinedIcon /> },
              { label: "report", icon: <DescriptionOutlinedIcon /> },
            ].map(({ icon, label }) => (
              <ListItem
                key={label}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigation(`/${label}`)}>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: active(label) && "#CC4D23",
                      stroke: active(label) && "#CC4D23",
                      strokeWidth: active(label) && "0.5",
                    }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          color: active(label) && "#CC4D23",
                          fontWeight: active(label) && 600,
                        }}>
                        {startCase(label)}
                      </Box>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
          <Stack sx={{ padding: "1.5rem" }}>
            <Button
              variant="contained"
              sx={{ borderRadius: "1rem" }}
              onClick={() => {
                dispatch(setToken());
                localStorage.clear();
              }}>
              <PowerSettingsNewIcon sx={{ pr: 0.75 }} />
              Logout
            </Button>
          </Stack>
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
