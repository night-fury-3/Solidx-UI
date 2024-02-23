import { Box, Typography } from "@mui/material";

function Error() {
  return (
    <Box my={4}>
      <Typography mx="auto" variant="h1" textAlign="center">
        404
      </Typography>
      <Typography mx="auto" textAlign="center">
        Not Found
      </Typography>
    </Box>
  );
}

export default Error;
