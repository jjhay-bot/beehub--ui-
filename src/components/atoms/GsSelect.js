import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { startCase } from "lodash";
import { useState } from "react";

export function SelectMultiple(props) {
  const { multiple = false, value = props.multiple ? [] : "", disabled, options, label, padding = "0.25rem" , sx} = props;
  const [title, setTitle] = useState((!value.length ? "Select " : "") + startCase(label));

  return (
    <FormControl
      size="small"
      sx={{ minWidth: 120, width: "100%", ...sx }}
      onFocus={() => setTitle(startCase(label))}
      // onBlur={() => (multiple ? !value.length : "") && setTitle("Select " + startCase(label))}
    >
      <InputLabel sx={{ padding: "0.25rem" }}>{title}</InputLabel>
      <Select
        {...props}
        sx={{ padding: padding }}
        disabled={disabled}
        labelId={label}
        value={value}
        multiple={multiple}
        label={label}
        name={label}
        id={label}
        required>
        {options?.map((item, i) => (
          <MenuItem key={i} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
