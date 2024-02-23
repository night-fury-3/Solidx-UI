import { Theme } from "@mui/material";

import Badge from "./Badge";
import Button from "./Button";
import CssBaseline from "./CssBaseline";
import Link from "./Link";
import TextField from "./TextField";
import Typography from "./Typography";
import Select from "./Select";

function Components(theme: Theme) {
  return {
    ...Badge(),
    ...Button(theme),
    ...CssBaseline(theme),
    ...Link(),
    ...TextField(theme),
    ...Typography(theme),
    ...Select(theme)
  };
}

export default Components;
