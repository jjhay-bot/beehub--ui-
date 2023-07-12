import React from "react";
import { Grid } from "@mui/material";

const PageContainer = (props) => {
  return (
    <Grid {...props} container justifyContent="center">
      {props.children}
    </Grid>
  );
};

export default PageContainer;
