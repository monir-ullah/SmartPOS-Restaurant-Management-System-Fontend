import {
  AppstoreOutlined,
  IdcardOutlined,
  RiseOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// MenuItem Type
type TMenuItem = { key?: string; icon?: ReactNode; label?: ReactNode, children?: TMenuItem[] };

// side abr menu paths
export const menuItem: TMenuItem[] = [
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
      }
    ]
  }
];
