import Service from "assets/icons/Service";

import { Stack, TextField, Typography } from "@mui/material";

import { ServiceInputProps } from "../../types";

function ServiceInput({ note, onChange, inputError }: ServiceInputProps) {
  return (
    <Stack
      bgcolor="#252525"
      borderRadius={3}
      px={2}
      py={2.5}
      spacing={2}
      sx={{ flexGrow: 1 }}
      width="100%"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Service />
        <Typography>Service</Typography>
      </Stack>
      <TextField
        size="small"
        sx={{ bgcolor: "#0B0C10", borderRadius: 2 }}
        value={note}
        onChange={(ev) => onChange(ev.target.value)}
        placeholder="Note: Marketing"
        error={inputError}
        InputProps={{
          sx: {
            "& input::-webkit-inner-spin-button": {
              display: "none"
            },
            "& fieldset": {
              borderRadius: 2,
              borderColor: "transparent"
            }
          }
        }}
      />
    </Stack>
  );
}

export default ServiceInput;
