import { CircularProgress, Box } from "@mui/material";
import { circularProgressClasses } from "@mui/material/CircularProgress";

export function FacebookCircularProgress(props) {
  return (
    <Box>
      <CircularProgress
        variant="determinate"
        sx={{
          color: "grey",
          // color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={6}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          animationDuration: "600ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={6}
        {...props}
      />
    </Box>
  );
}

export const ProgressBar = ({ loading, type }) => {
  return (
    loading && (
      <Box position="absolute" top="45vh" sx={{ left: "50vw" }} mx={-2.5} zIndex={1}>
        <FacebookCircularProgress />
      </Box>
    )
  );
};

export default ProgressBar;
