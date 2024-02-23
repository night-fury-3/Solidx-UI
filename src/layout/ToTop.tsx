import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Stack, useTheme } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

import _ from "lodash";

function ToTop() {
  const theme = useTheme();
  const [isVisible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    ref.current?.parentElement?.scrollTo(0, 0);
  }, [ref]);

  const debouncedSetVisible = useMemo(() => _.debounce(setVisible, 450), []);

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;

    if (ref.current) {
      observerRefValue = ref.current;
      const scrollListener = () => {
        if (Number(ref.current?.parentElement?.scrollTop) > 32) {
          debouncedSetVisible(true);
        } else {
          debouncedSetVisible(false);
        }
      };
      ref.current.parentElement?.addEventListener("scroll", scrollListener);

      return () => {
        if (observerRefValue)
          observerRefValue.parentElement?.removeEventListener("scroll", scrollListener);
      };
    }
  }, [debouncedSetVisible]);

  return (
    <Stack
      ref={ref}
      alignItems="center"
      justifyContent="center"
      bgcolor="#252525"
      border={1}
      borderColor={theme.palette.primary.main}
      borderRadius="100%"
      sx={{
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "fill" : "none",
        transition: "all 0.2s",
        "&:hover": {
          animation: "1.8s infinite bounce",
          boxShadow: `0px 0px 10px ${theme.palette.primary.main}`
        }
      }}
      width={50}
      height={50}
      position="fixed"
      bottom={50}
      right={{ sm: 40, xs: 30 }}
      onClick={handleClick}
    >
      <ArrowUpward />
    </Stack>
  );
}

export default ToTop;
