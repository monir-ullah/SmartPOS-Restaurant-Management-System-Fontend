/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import {
  AppstoreFilled,
  // DashboardFilled,
  // MediumOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  // SoundFilled,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Badge } from "antd";
import { menuItem } from "../../sidebar/sidebarMenu";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOutUser } from "../../redux/features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TUserInfo } from "../../interface/interface.type";
import ChatApp from "../UI/chat/ChatApp";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  // This is for sidebar collapsed in the main layout
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  // Smaller Screen Size  maxWidth 576px
  // const isSmallScreen = useMediaQuery({ maxWidth: 576 });

  const themeHeader = {
    colorBgContainer: "#FFFFFF",
    defaultHeight: "70px",
    firstHeight: "20%",
    secondHeight: "25%",
    thirdHeight: "16%",
    marginLeft: "20px",
  };

  // Redux  state for log out button.

  const user = useAppSelector((state) => state.user.user) as TUserInfo;

  // User credentials
  const userName = user.username;
  const expDate = user.exp;
  const currentTime = Math.floor(Date.now() / 1000); // current Date.

  const isUserCorrect = userName && expDate > currentTime; // is user is authorize or not

  console.log("User Info:", user);

  // Handling Layout Header responsive issue
  let layoutHight: any;
  // if (isSmallScreen) {
  //   if (!collapsed) {
  //     if (selectedBulkDeleteItems.length > 0) {
  //       layoutHight = themeHeader.secondHeight;
  //     } else {
  //       layoutHight = themeHeader.firstHeight;
  //     }
  //   } else {
  //     if (selectedBulkDeleteItems.length > 0) {
  //       layoutHight = themeHeader.thirdHeight;
  //     }
  //   }
  // } else {
  //   layoutHight = themeHeader.defaultHeight;
  // }

  // Header style
  const headerStyle = {
    padding: 0,
    background: themeHeader.colorBgContainer,
    height: layoutHight,
  };

  // this is Dispatch function from redux
  const dispatch = useAppDispatch();

  // user Logout function
  const logOutFunction = () => {
    dispatch(logOutUser());
    toast.success("User Logout Successfully");
    return navigate("/login");
  };

  return (
    // This is the main Layout in our Software
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavLink to={"/"} replace={true}>
            <AppstoreFilled
              style={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "2.5rem",
              }}
            />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItem as any}
        />
      </Sider>
      <Layout>
        {/* This is the header layout */}
        <Header style={headerStyle} className="header-height-main-layout">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          {isUserCorrect && (
            <>
              <Button
                type="primary"
                danger
                onClick={logOutFunction}
                style={{
                  fontWeight: "bold",
                  padding: "0 16px",
                  height: "36px",
                  marginRight: "12px",
                }}
              >
                Logout
              </Button>

              <Badge
                count={null}
                style={{
                  backgroundColor: "#60ca2a",
                  color: "white",
                  padding: "6px 16px",
                  fontSize: "15px",
                  fontWeight: 600,
                  borderRadius: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <span style={{ marginRight: "16px" }}>
                  <UserOutlined style={{ marginRight: 6 }} />
                  {userName
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                <span>
                  <SettingOutlined style={{ marginRight: 6 }} />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </Badge>
            </>
          )}
        </Header>

        {/* This section will show the content inside the main layout. */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {window.location.pathname === "/" ? (
            // Home page will show if the path is '/'
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1>SmartPOS: A Web-Based Restaurant Management System</h1>
              <p style={{ padding: "50px 300px" }}>
                SmartPOS is an all-in-one web-based restaurant management system
                designed to streamline daily operations. It offers real-time
                order tracking, table management, inventory control, and sales
                reporting — all accessible from any device. Built for speed and
                simplicity, SmartPOS helps restaurants run smarter and serve
                better
              </p>

              {/*Login in a registration Button  */}
              <div style={{ display: "flex", gap: 30, margin: "20px" }}>
                <NavLink to={"/login"} replace={true}>
                  <Button type="primary">Login</Button>
                </NavLink>
                <NavLink to={"/registration"} replace={true}>
                  <Button>Registration</Button>
                </NavLink>
              </div>
            </div>
          ) : (
            // Handling Routes . For this every page will show in the software layout.
            <Outlet />
          )}

          {user.role === "administrator" && <ChatApp />}

          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
