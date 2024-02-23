import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

// import Edit from "assets/icons/Edit";

function MilestonePreview({
  amount,
  deadline,
  description,
  onApprove
}: {
  amount: string;
  deadline?: number;
  description?: string;
  onApprove?: () => void;
}) {
  const theme = useTheme();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <Typography>Amount</Typography>
          <Typography fontSize={"0.875rem"} color={theme.palette.text.secondary}>
            {amount}
          </Typography>
        </Stack>
        {deadline ? (
          <Stack spacing={1}>
            <Typography>Due Date</Typography>
            <Typography fontSize={"0.875rem"} color={theme.palette.text.secondary}>
              {new Date(deadline).toDateString().slice(4)}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
      {description ? (
        <Stack spacing={1} mt={2.5}>
          <Typography>Description</Typography>
          <Typography fontSize={"0.875rem"} color={theme.palette.text.secondary}>
            {description}
          </Typography>
        </Stack>
      ) : null}
      {onApprove ? (
        <Stack spacing={2.5} mt={4} direction="row" justifyContent="end">
          <Button variant="contained" onClick={onApprove}>
            {/* <Edit /> */}
            <Typography ml={1} color="inherit">
              Approve
            </Typography>
          </Button>
        </Stack>
      ) : null}
    </Box>
  );
}

export default MilestonePreview;
