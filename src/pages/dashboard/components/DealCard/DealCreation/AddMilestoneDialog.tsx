import { useCallback, useEffect } from "react";

import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useFormik } from "formik";
import * as yup from "yup";

import { Milestone } from "../../../types";

import dayjs from "dayjs";

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required.")
    .test("is-amount", "Amount should be greater than zero.", (value) => value > 0),
  name: yup.string().required("Name is required."),
  deadline: yup.date(),
  description: yup.string()
});

type TMilestoneForm = {
  amount: number;
  name: string;
  deadline?: Date;
  description?: string;
};

function AddMilestoneDialog({
  opened,
  onSave,
  symbol,
  defaultMilestone,
  onClose,
  onAdd
}: {
  opened: boolean;
  symbol: string;
  defaultMilestone?: Milestone;
  onSave: (_: Milestone, __: number) => void;
  onClose: () => void;
  onAdd: (_: Milestone) => void;
}) {
  const {
    values: formValues,
    errors: formErrors,
    touched: formTouched,
    handleChange,
    handleSubmit,
    setValues,
    setTouched,
    setErrors,
    setFieldValue
  } = useFormik<TMilestoneForm>({
    initialValues: {
      amount: defaultMilestone?.amount || 0,
      name: defaultMilestone?.name || "",
      deadline: defaultMilestone?.deadline,
      description: defaultMilestone?.description
    },
    validationSchema,
    onSubmit: (values) => {
      if (defaultMilestone !== undefined) {
        onSave(values, defaultMilestone.index || 0);
      } else {
        onAdd(values);
      }
      onClose();
    }
  });

  // const handleSave = useCallback(() => {
  //   if (!formErrors) {
  //     handleSubmit();
  //     setValues({ amount: 0, name: "" });
  //   }
  // }, [formErrors, handleSubmit, defaultMilestone, onSave, onClose, setValues]);

  const handleClose = useCallback(() => {
    onClose();
    setValues({ amount: 0, name: "" });
    setTouched({});
    setErrors({});
  }, [setValues, onClose, setTouched, setErrors]);

  useEffect(() => {
    window.addEventListener("error", (e) => {
      console.log(e.message);
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { borderRadius: 6 } }}
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <Box
          px={{ xs: 2, sm: 6 }}
          py={{ xs: 2, sm: 6 }}
          sx={{
            background: "linear-gradient(325deg, #1E1E1E -78.15%, rgba(30, 30, 30, 0.7) 112.14%)"
          }}
        >
          <Stack spacing={{ xs: 2, sm: 6 }}>
            <Typography fontSize="1.5rem" fontWeight={600} textAlign="center">
              Add Milestone
            </Typography>
            <Stack spacing={3}>
              <Stack spacing="0.5rem">
                <Typography>Name of Milestone</Typography>
                <TextField
                  size="small"
                  value={formValues.name}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  error={Boolean(formErrors.name && formTouched.name)}
                  helperText={formErrors.name && formTouched.name ? formErrors.name : undefined}
                  placeholder="Milestone Name"
                />
              </Stack>
              <Stack spacing="0.5rem">
                <Typography>Amount</Typography>
                <TextField
                  size="small"
                  type="number"
                  id="amount"
                  name="amount"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>
                  }}
                  sx={{ "& input::-webkit-inner-spin-button": { WebkitAppearance: "none" } }}
                  value={formValues.amount}
                  error={Boolean(formErrors.amount && formTouched.amount)}
                  helperText={
                    formErrors.amount && formTouched.amount ? formErrors.amount : undefined
                  }
                  onChange={handleChange}
                />
              </Stack>
              <Stack spacing="0.5rem">
                <Typography>Due Date (Optional)</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={formValues.deadline ? dayjs(formValues.deadline) : undefined}
                      sx={{ width: "100%" }}
                      onChange={(value) =>
                        value ? setFieldValue("deadline", value.toDate()) : null
                      }
                      slotProps={{ textField: { placeholder: "DD/MM/YYYY" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <Stack spacing="0.5rem">
                <Typography>Description (Optional)</Typography>
                <TextField
                  size="small"
                  id="description"
                  name="description"
                  multiline
                  placeholder="Add description"
                  value={formValues.description}
                  error={Boolean(formErrors.description && formTouched.description)}
                  helperText={
                    formErrors.description && formTouched.description
                      ? formErrors.description
                      : undefined
                  }
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
            <Stack spacing={2.5} mt={6}>
              <Stack spacing={3} direction="row" justifyContent="center">
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button variant="outlined" type="submit">
                  Save & Add another
                </Button>
              </Stack>
              <Button onClick={handleClose}>Cancel</Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Dialog>
  );
}

export default AddMilestoneDialog;
