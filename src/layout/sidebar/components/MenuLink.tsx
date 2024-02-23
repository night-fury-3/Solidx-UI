import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "store";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import Link from "@mui/material/Link";

import { MenuLinkProps } from "../types";

function MenuLink({ item }: MenuLinkProps) {
  const theme = useTheme();
  const location = useLocation();
  const { isMinimized } = useSelector((state: RootState) => state.menu);

  return (
    <Link to={item.url} component={RouterLink}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: "pointer" }}>
        <Box
          width={32}
          height={32}
          sx={{
            filter: "drop-shadow(0 1rem 1.7rem rgba(238, 120, 108, 0.5))",
            bgcolor: "transparent"
          }}
        >
          {item.icon ? item.icon : null}
        </Box>
        {!isMinimized ? (
          <Typography
            fontSize="1rem"
            fontWeight={500}
            color={
              location.pathname === item.url
                ? theme.palette.text.primary
                : theme.palette.text.secondary
            }
            sx={{
              filter: "drop-shadow(0 1rem 1.7rem rgba(238, 120, 108, 0.5))"
            }}
          >
            {item.title}
          </Typography>
        ) : null}
      </Stack>
    </Link>
  );
}

export default MenuLink;
