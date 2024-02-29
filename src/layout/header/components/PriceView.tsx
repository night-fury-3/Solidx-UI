import { Stack, Typography } from "@mui/material";

import Logo from "../../../assets/icons/LogoWithoutText";

function PriceView() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack
        width={38}
        height={38}
        bgcolor="#000000"
        borderRadius="100%"
        border={"1px solid #333333"}
        alignItems="center"
        justifyContent="center"
      >
        <Logo />
      </Stack>
      <Typography fontSize="0.75rem" fontWeight={600}>
        $1.056
      </Typography>
    </Stack>
  );
}

export default PriceView;
