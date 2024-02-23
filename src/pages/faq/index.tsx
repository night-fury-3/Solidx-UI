// import { Fragment } from "react";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";
import FaqRow from "./components/FaqRow";

import { FaqRowProps } from "./types";

const FaqData = [
  {
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  }
];

const Faq = () => {
  return (
    <MainBox>
      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: "white",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "56px",
          }}
        >
          FAQ
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box maxWidth="100%" sx={{ overflowX: "auto" }}>
        <Grid container alignItems="center" minWidth={875} spacing={"20px"}>
          {FaqData?.map((item: FaqRowProps) => (
            <Grid item xs={12} key={`${Date.now()}-${item.question}-${item.answer}`}>
              <FaqRow question={item.question} answer={item.answer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainBox>
  );
};

export default Faq;
