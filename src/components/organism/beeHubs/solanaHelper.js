import { TextField } from "@mui/material";
import { clusterApiUrl } from "@solana/web3.js";
import { startCase } from "lodash";

export const programID = "7Q4EY4QVj1o7MyNdzsPed1XYycvgaWmBpnishC8m4yQK";
export const opts = { preflightCommitment: "processed" };
export const network = clusterApiUrl("devnet");

export const InputField = (props) => {
  return (
    <TextField
      multiline={false}
      size="small"
      name={props.name}
      label={props.optional ? `${startCase(props.name)}(Optional)` : startCase(props.name)}
      {...props}
    />
  );
};

export const resetForm = {
  gif_link: null,
  gif_tag: null,
  gif_name: null,
  timestamp: null,
  author: localStorage.getItem("gif_author") || "jjhay",
  author_avatar: null,
  style: null,
};
