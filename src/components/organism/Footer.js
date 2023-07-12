import { Grid, Stack } from "@mui/material";
import React from "react";
import { FbIcon, IgIcon } from "../../assets/icons";

const Footer = ({ isMobile }) => {
  return isMobile ? (
    <FooterMobile />
  ) : (
    <Stack
      className="font_railway"
      sx={{
        // position: "fixed",
        px: "6.5rem",
        bottom: 0,
        left: 0,
        width: "-webkit-fill-available",
        height: "13rem",
        background: "#000 !important",
        color: "#fff",
      }}>
      <Grid container spacing={16} pt={6}>
        <Grid item>
          <Stack gap={1}>
            <Grid item className="tx700 tx115" pb={2} sx={{ letterSpacing: "2px" }}>
              CONTACT US
            </Grid>
            <Grid item>
              email:
              <a className="c4 pointer" href="mailto:hello@momentoph.xyz">
                hello@momentoph.xyz
              </a>
            </Grid>
          </Stack>
        </Grid>

        <Grid item>
          <Stack sx={{ width: "100%" }} gap={1}>
            <Grid item className="tx700 tx115" sx={{ letterSpacing: "2px" }}>
              SOCIALS
            </Grid>

            <Grid item>
              <Grid container gap={2}>
                <FbIcon />
                <Grid item>
                  <a
                    className="c4 pointer"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/momentoph.xyz">
                    Momento PH
                  </a>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container gap={2}>
                <IgIcon />
                <Grid item> momentoph.xyz</Grid>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Grid container py={4} className="tx90" justifyContent="end">
        Copyright 2023 | All rights reserved | www.momentoph.xyz
      </Grid>
    </Stack>
  );
};

const FooterMobile = () => {
  return (
    <Stack
      p={4}
      className="font_railway"
      sx={{
        background: "#000 !important",
      }}>
      <Grid container gap={1.5}>
        <Grid container gap={1}>
          <FbIcon />
          <IgIcon />
        </Grid>

        <Grid item className="tx90">
          email:
          <a className="c4 pointer" href="mailto:hello@momentoph.xyz">
            hello@momentoph.xyz
          </a>
        </Grid>
      </Grid>
      <Grid item className="tx90" pt={2}>
        Copyright 2023 | All rights reserved | www.momentoph.xyz
      </Grid>
    </Stack>
  );
};

export default Footer;
