import { Autocomplete, Box, Button, Grid, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { TextField, ThemeProvider, Typography } from "@mui/material";
import { themeForm } from "../../util/styles/theme";
import ProgressBar from "./ProgressBar";
import { startCase, lowerCase } from "lodash";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function FormTitle(props) {
  const { title, color } = props;
  return (
    <Typography
      sx={{ fontWeight: "600" }}
      color={color || "primary"}
      component="h2"
      variant="h6"
      textAlign="center"
      {...props}>
      {title}
    </Typography>
  );
}

export const GsTextField = (props) => {
  const { label, prefix, suffix, width, helperText, error, type = "text" } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setShowPassword(type === "password");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextField
      {...props}
      label={startCase(label)}
      id={lowerCase(label)}
      name={lowerCase(label)}
      fullWidth={!width}
      type={showPassword ? "password" : "text"}
      error={helperText || error ? true : false}
      InputProps={{
        startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
        endAdornment:
          type === "password" ? (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ) : (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ),
      }}
    />
  );
};

export const GsSelect = (props) => {
  const { options = [], defaultValue = [] } = props;
  <Autocomplete
    multiple
    id="tags-outlined"
    options={options}
    getOptionLabel={(option) => option.label}
    defaultValue={defaultValue}
    filterSelectedOptions
    renderInput={(params) => (
      <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
    )}
  />;
};

export const GsButton = (props) => {
  const { label, width, sx, variant = "contained", tooltip } = props;
  return (
    <ThemeProvider theme={themeForm}>
      <Tooltip title={tooltip} arrow>
        <Button
          {...props}
          variant={variant}
          size="large"
          className="tx500 tx90 ls50 capitalize"
          sx={{ padding: "0.575rem", width: width || "100%", ...sx }}>
          {label}
        </Button>
      </Tooltip>
    </ThemeProvider>
  );
};

// GsForm modify form content style (input, button)
export const GsForm = ({ children = [], sx, spacing, onSubmit, direction = "col", width, sx_grid }) => (
  <Box sx={{ ...sx }}>
    <ThemeProvider theme={themeForm}>
      <ProgressBar loading={false} />
      {direction === "col" ? (
        <Stack
          spacing={spacing || 2}
          my={2}
          component="form"
          onSubmit={onSubmit}
          sx={{ width, ...sx_grid }}>
          {children}
        </Stack>
      ) : (
        <Grid container spacing={spacing || 3} component="form" onSubmit={onSubmit} sx={{ ...sx_grid }}>
          {children.map((x, key) => (
            <Grid key={key} item width={width}>
              {x}
            </Grid>
          ))}
        </Grid>
      )}
    </ThemeProvider>
  </Box>
);

export const Item = (props) => (
  <Grid item {...props}>
    {props.children}
  </Grid>
);

export const Text = (props) => (
  <Box className="tx600 tx115" m="auto" {...props}>
    {props.children}
  </Box>
);



