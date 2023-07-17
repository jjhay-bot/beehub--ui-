import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import { Button, Grid } from "@mui/material";
import { Item } from "./atoms/customComponent";
import { useWidth } from "../util/useWidth";
import { useNavigate } from "react-router-dom";

import MenuOptions from "./molecules/MenuOptions";

function ScrollTop({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ block: "center" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

export default function AppBarContainer(props) {
  const { width } = useWidth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setIsMobile(width <= 600), [width]);

  const navigate = useNavigate();

  return (
    <Box py={2}>
      <CssBaseline />
      <AppBar className="smooth">
        <Toolbar sx={{ p: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Item className="pointer" onClick={() => navigate("/")}>
              <Grid container spacing={1}>
                <Item mt={1} ml={1}>
                  {/* <StarIcon /> */}
                  <img
                    src="https://www.freepnglogos.com/uploads/bee-png/does-bee-sting-the-penis-hurt-idiotprufs-32.png"
                    alt="bee"
                    width={25}
                  />
                </Item>
                <Item className="tx600 tx115 c4" onClick={() => navigate("/")}>
                  BeeHub
                </Item>
                <Item className="tx400 tx115 c4">(Build using Solana)</Item>
              </Grid>
            </Item>

            <Item>
              {isMobile ? (
                <MenuOptions />
              ) : (
                <Grid container>
                  <Item>
                    <Button
                      className="capitalize tx100 tx400"
                      sx={{ color: "white" }}
                      onClick={() => navigate("/wallet")}>
                      Home
                    </Button>
                  </Item>

                  {/* <Item>
                    <Button
                      className="capitalize tx100 tx400"
                      sx={{ color: "white" }}
                      onClick={() => navigate("/about")}>
                      About Us
                    </Button>
                  </Item> */}
                </Grid>
              )}
            </Item>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <Container sx={{ mt: 1.5, maxWidth: `${width >= 1300 && "1300px !important"}` }}>
        {props.children}
      </Container>

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
