import { Stack, TextField } from "@mui/material";
import CoinSelect from "components/CoinSelect";

import { CoinInputProps } from "../../types";
import { useChainId } from "wagmi";

function CoinInput({
  amount,
  coin,
  onAmountChange,
  onCoinChange,
  inputReadOnly,
  inputError
}: CoinInputProps) {
  const chainId = useChainId();

  return (
    <Stack
      bgcolor="#252525"
      borderRadius={3}
      px={2}
      py={2.5}
      spacing={2}
      sx={{ flexGrow: 1 }}
      width="100%"
    >
      <CoinSelect coin={coin} onChange={onCoinChange} chainId={chainId} />
      <TextField
        size="small"
        sx={{ bgcolor: "#0B0C10", borderRadius: 2 }}
        type="number"
        value={amount || "0"}
        onChange={onAmountChange ? (ev) => onAmountChange(ev.target.value) : undefined}
        error={inputError}
        InputProps={{
          readOnly: inputReadOnly,
          sx: {
            "& input::-webkit-inner-spin-button": {
              display: "none"
            },
            "& fieldset": {
              borderRadius: 2,
              borderColor: "transparent"
            }
          }
        }}
      />
    </Stack>
  );
}

export default CoinInput;
