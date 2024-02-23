import { Grid } from "@mui/material";

import DealCard from "./components/DealCard";
// import DealOverview from "./components/DealOverview";
import DealChat from "./components/DealChat";

function Dashboard() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <DealCard />
      </Grid>
      <Grid item xs={12}>
        <DealChat />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
