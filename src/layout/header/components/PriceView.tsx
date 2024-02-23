import { Stack, Typography } from "@mui/material";

function PriceView() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack
        width={38}
        height={38}
        bgcolor="#252525"
        borderRadius="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="0.75rem" fontWeight={700}>
          SD
        </Typography>
      </Stack>
      <Typography fontSize="0.75rem" fontWeight={600}>
        $1.056
      </Typography>
    </Stack>
  );
}

export default PriceView;
