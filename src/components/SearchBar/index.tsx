import { InputAdornment, TextField, useTheme } from "@mui/material";

import Search from "assets/icons/Search";

import { SearchBarProps } from "./index.type";

function SearchBar({ onChange, value, placeholder }: SearchBarProps) {
  const theme = useTheme();

  return (
    <TextField
      placeholder={placeholder ? placeholder : "Search Here..."}
      sx={{
        padding: 0,
        background: theme.palette.background.default,
        border: 0,
        borderRadius: 2,
        maxWidth: 370,
        minWidth: 0
      }}
      size="small"
      InputProps={{
        startAdornment: <InputAdornment component={Search} position="start" />,
        sx: {
          "& input": { padding: { xs: 1.2, sm: 1.5 }, fontSize: 12 },
          "& fieldset": { border: 0 }
        }
      }}
      value={value}
      onChange={(ev) => (onChange ? onChange(ev.target.value) : null)}
      fullWidth
    />
  );
}

export default SearchBar;
