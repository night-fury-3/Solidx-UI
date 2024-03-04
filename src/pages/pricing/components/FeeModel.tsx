import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";

import FeeMin from "assets/icons/FeeMin";
import FeeMax from "assets/icons/FeeMax";

const FeeModel = () => {
  return (
    <MainBox>
      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: "white",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "56px"
          }}
        >
          Pricing
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box maxWidth="100%" sx={{ overflowX: "auto" }}>
        <Grid container alignItems="center" spacing={"24px"}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={"10px"}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal"
                  }}
                >
                  Fee Model
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "150%"
                  }}
                >
                  0.5% from <br />
                  Amount {">"} 5 USD {"<"} 250 USD
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "150%",
                    background: "linear-gradient(90deg, #66FCF1 0%, #1499E4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Everything is in SolidX
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              sx={{
                backgroundColor: "#121212",
                padding: "24px",
                borderRadius: "8px"
              }}
            >
              <Grid container>
                <Grid item xs={12} container justifyContent={"center"}>
                  <FeeMin />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems={"baseline"}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          padding: "18px 6px",
                          fontSize: "42px",
                          fontWeight: "600",
                          lineHeight: "normal",
                          textAlign: "right",
                          alignItems: "center"
                        }}
                      >
                        05
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          padding: "18px 6px",
                          fontSize: "24px",
                          fontWeight: "400",
                          lineHeight: "normal",
                          textAlign: "left",
                          alignItems: "center"
                        }}
                      >
                        USD
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      padding: "3.5px",
                      fontSize: "14px",
                      fontWeight: "100",
                      lineHeight: "normal",
                      textAlign: "center"
                    }}
                  >
                    Minimum fee
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography
                    sx={{
                      color: "#8D9092",
                      padding: "3.5px",
                      marginTop: "12px",
                      fontSize: "14px",
                      fontWeight: "100",
                      lineHeight: "150%",
                      textAlign: "center"
                    }}
                  >
                    Lorem Ipsum is simply dummy text Lorem Ipsum
                  </Typography>
                </Grid> */}
              </Grid>
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              sx={{
                backgroundColor: "#121212",
                padding: "24px",
                borderRadius: "8px"
              }}
            >
              <Grid container>
                <Grid item xs={12} container justifyContent={"center"}>
                  <FeeMax />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems={"baseline"}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          padding: "18px 6px",
                          fontSize: "42px",
                          fontWeight: "600",
                          lineHeight: "normal",
                          textAlign: "right",
                          alignItems: "center"
                        }}
                      >
                        250
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          padding: "18px 6px",
                          fontSize: "24px",
                          fontWeight: "400",
                          lineHeight: "normal",
                          textAlign: "left",
                          alignItems: "center"
                        }}
                      >
                        USD
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      padding: "3.5px",
                      fontSize: "14px",
                      fontWeight: "100",
                      lineHeight: "normal",
                      textAlign: "center"
                    }}
                  >
                    Maximum fee
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography
                    sx={{
                      color: "#8D9092",
                      padding: "3.5px",
                      marginTop: "12px",
                      fontSize: "14px",
                      fontWeight: "100",
                      lineHeight: "150%",
                      textAlign: "center"
                    }}
                  >
                    Lorem Ipsum is simply dummy text Lorem Ipsum
                  </Typography>
                </Grid> */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainBox>
  );
};

export default FeeModel;
