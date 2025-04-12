import {
  AppstoreOutlined,
  CoffeeOutlined,
  IdcardOutlined,
  OrderedListOutlined,
  RiseOutlined,
  SettingOutlined,
  TableOutlined,
  TabletFilled,
  UnderlineOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

/* 
 * @typedef {Object} TMenuItem
 * @property {string} [key] - Unique identifier for the menu item
 * @property {ReactNode} [icon] - Icon component for the menu item
 * @property {ReactNode} [label] - Label or content of the menu item
 * @property {TMenuItem[]} [children] - Sub-menu items
 */
type TMenuItem = { key?: string; icon?: ReactNode; label?: ReactNode, children?: TMenuItem[] };

/* 
 * @constant {TMenuItem[]} menuItem
 * @description Main navigation configuration for the sidebar
 * Contains all route definitions and their hierarchical structure
 * Organized into sections: Authentication, Food Management, and Table Management
 */
export const menuItem: TMenuItem[] = [
  /* Authentication Section */
  {
    key: "Login",
    icon: <UserOutlined />,
    label: <NavLink to={"/login"}>Login</NavLink>,
  },
  {
    key: "registration",
    icon: <IdcardOutlined />,
    label: <NavLink to={"/registration"}>Registration</NavLink>,
  },

  /* 
   * @section Food Management
   * @description Handles all food category related operations
   * Includes creation and listing of food categories
   */
  {
    key: "category",
    icon: <AppstoreOutlined />,
    label: 'Food MNG',
    children: [
      {
        key: "create-category",
        icon: <RiseOutlined />,
        label: <NavLink to={"/create-category"}>Create Category</NavLink>,
      },
      {
        key: "category-list",
        icon: <SettingOutlined />,
        label: <NavLink to={"/category-list"}>Category List</NavLink>,
      },
      {
        key: "fooditem-list",
        icon: <OrderedListOutlined />,
        label: <NavLink to={"/fooditem-list"}>Food List</NavLink>,
      },
      {
        key: "create-food",
        icon: <CoffeeOutlined />,
        label: <NavLink to={"/create-food"}>Create Food</NavLink>,
      }
    ]
  },

  /* 
   * @section Table Management
   * @description Handles restaurant table operations
   * Includes table creation and configuration
   */
  {
    key: "table",
    icon: <TableOutlined /> ,
    label: 'Table MNG',
    children: [
      {
        key: "create-table",
        icon: <TabletFilled />,
        label: <NavLink to={"/create-table"}>Create Table</NavLink>,
      },
      {
        key: "table-list",
        icon: <UnorderedListOutlined />,
        label: <NavLink to={"/table-list"}>Table List</NavLink>,
      },
    ]
  },

  /* 
   * @section Order Management
   * @description Handles restaurant order operations
   * Includes order creation and listing
   */
  {
    key: "order",
    icon: <OrderedListOutlined />,
    label: 'Order MNG',
    children: [
      {
        key: "create-order",
        icon: <RiseOutlined />,
        label: <NavLink to={"/create-order"}>Create Order</NavLink>,
      },
      {
        key: "order-list",
        icon: <UnorderedListOutlined />,
        label: <NavLink to={"/order-list"}>Order List</NavLink>,
      },
    ]
  },
];
