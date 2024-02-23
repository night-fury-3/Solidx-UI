import { Grid } from "@mui/material";

import FeeModel from "./components/FeeModel";
import FeeCalculater from "./components/FeeCalculater";

const Faq = () => {
  return (
    <Grid container spacing={"42px"}>
      <Grid item xs={12}>
        <FeeModel />
      </Grid>
      <Grid item xs={12}>
        <FeeCalculater />
      </Grid>
    </Grid>
  );
};

export default Faq;
