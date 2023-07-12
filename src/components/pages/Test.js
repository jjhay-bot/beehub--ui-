import { Box, Button } from "@mui/material";
import React from "react";
// import actions from '../../graphql/actions';
import axios from "axios";

const Test = () => {
  const getVendorList = async () => {
    const url =
      "https://secure-cdn-api.bridestory.com/ms/feeds/api/v1/vendors?country=PH&city=cavite&order=featured";

    try {
      const data = await axios.get(url);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* Test */}
      <Button variant="contained" onClick={getVendorList}>
        Test2
      </Button>
    </Box>
  );
};

export default Test;
