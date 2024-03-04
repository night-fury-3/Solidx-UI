import { ThreeDots } from "react-loader-spinner";

import { Box, Grid, Typography, useTheme } from "@mui/material";

import Logo from "assets/icons/Logo";
import { FeeDisplayerProps } from "../types";

const FeeDisplayer = ({ isRuningTx, feeAmount }: FeeDisplayerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        padding: "24px",
        borderRadius: "8px"
      }}
    >
      <Grid container>
        {isRuningTx ? (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            top={0}
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backdropFilter: "blur(1px)" }}
            bgcolor={`${theme.palette.background.default}A0`}
          >
            <ThreeDots height="100%" width={100} radius={3} color={theme.palette.primary.main} />
          </Box>
        ) : null}
        <Grid item xs={12} container justifyContent={"center"}>
          <Logo />
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
                {`${Math.floor(Number(feeAmount) / 1e9)}`}
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
                SOLIDX
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
            SolidX Escrow Fee Calculater
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography
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
          </Typography> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeeDisplayer;
