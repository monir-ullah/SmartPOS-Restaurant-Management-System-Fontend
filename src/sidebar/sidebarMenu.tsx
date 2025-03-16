import {
  IdcardOutlined,
  RiseOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// MenuItem Type
type TMenuItem = { key: string; icon: ReactNode; label: ReactNode };

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
];
