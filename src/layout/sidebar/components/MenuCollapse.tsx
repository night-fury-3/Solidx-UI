import { Fragment, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { RootState } from "store";
import { activeItem, inactiveItem } from "store/reducers/Menu";

import MenuLink from "./MenuLink";
import MenuItem from "./MenuItem";

import type { MenuItem as IMenuItem } from "types/menu.type";

function MenuCollapse({ item }: { item: IMenuItem }) {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();

  const { menus: menuList, isMinimized } = useSelector((state: RootState) => state.menu);

  const isOpened = useMemo<boolean>(() => {
    return Boolean(menuList.find((value) => value.id === item.id)?.activeItem);
  }, [item, menuList]);

  const handleClick = useCallback(() => {
    dispatch(!isOpened ? activeItem(item.id) : inactiveItem(item.id));
  }, [dispatch, isOpened, item]);

  return (
    <Fragment>
      {isMinimized ? (
        <MenuItem
          key={`${Date.now()}-${item.title}-${item.id}`}
          isActive={location.pathname.includes(item.url)}
        >
          <MenuLink item={item} />
        </MenuItem>
      ) : (
        <Box px={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {item.icon}
              <Typography
                fontSize="1rem"
                fontWeight={500}
                noWrap
                whiteSpace={"nowrap"}
                color={isOpened ? theme.palette.primary.main : theme.palette.text.secondary}
              >
                {item.title}
              </Typography>
            </Stack>
            {isOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Stack>
          <Stack
            ml={1}
            height={isMinimized || !isOpened ? 0 : "auto"}
            mt={1}
            spacing={0.5}
            overflow="hidden"
          >
            {item.submenus?.map((_item) => (
              <MenuItem
                key={`${Date.now()}-${_item.title}-${_item.id}`}
                isActive={location.pathname === _item.url}
              >
                <MenuLink item={_item} />
              </MenuItem>
            ))}
          </Stack>
        </Box>
      )}
    </Fragment>
  );
}

export default MenuCollapse;
