// import About from "assets/icons/About";
import Dashboard from "assets/icons/Dashboard";
// import Docs from "assets/icons/Docs";
// import Faq from "assets/icons/Faq";
import MyDeals from "assets/icons/MyDeals";
import Pricing from "assets/icons/Pricing";
// import Settings from "assets/icons/Settings";

import { MenuItem, MenuItemType } from "types/menu.type";

export const menuList: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: MenuItemType.Item,
    icon: <Dashboard />,
    url: "/"
  },
  {
    id: "my-deals-collapse",
    title: "My Deals",
    type: MenuItemType.Group,
    icon: <MyDeals />,
    url: "/my-deals",
    submenus: [
      {
        id: "my-deals",
        title: "OTC Deals",
        type: MenuItemType.Item,
        url: "/my-deals"
      },
      {
        id: "my-services",
        title: "Service Escrows",
        type: MenuItemType.Item,
        url: "/my-deals/service"
      }
    ]
  },
  // {
  //   id: "docs",
  //   title: "Docs",
  //   type: MenuItemType.Item,
  //   icon: <Docs />,
  //   url: "/docs"
  // },
  // {
  //   id: "faq",
  //   title: "FAQ",
  //   type: MenuItemType.Item,
  //   icon: <Faq />,
  //   url: "/faq"
  // },
  {
    id: "pricing",
    title: "Pricing",
    type: MenuItemType.Item,
    icon: <Pricing />,
    url: "/pricing"
  },
  // {
  //   id: "about",
  //   title: "About",
  //   type: MenuItemType.Item,
  //   icon: <About />,
  //   url: "/about"
  // }
  // {
  //   id: "settings",
  //   title: "Settings",
  //   type: MenuItemType.Item,
  //   icon: <Settings />,
  //   url: "/settings"
  // }
];
