import { Box } from "@mui/material";

import BackgroundVectors from "assets/images/bg-vectors.png";

import { MainBoxProps } from "./index.type";

function MainBox({ children }: MainBoxProps) {
  return (
    <Box
      borderRadius={3}
      padding={{ sm: 4, xs: 2 }}
      sx={{
        border: "1px solid #222",
        background: "linear-gradient(325deg, #2E2E2E -78.15%, rgba(46, 46, 46, 0.00) 112.14%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {children}

      <Box position="absolute" bottom="-30%" left="30%" zIndex={-1} sx={{ userSelect: "none" }}>
        <img src={BackgroundVectors} alt="vectors" />
      </Box>
    </Box>
  );
}

export default MainBox;
