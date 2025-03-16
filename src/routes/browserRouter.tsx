import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/UI/Login";
import { ReactNode } from "react";
import Registration from "../components/UI/Registration";
import PageNotFound from "../utilities/PageNotFound";

type TRoute = {
  path: string;
  element?: ReactNode;
  children?: TRoute[];
};

// defining all routes
const allRoutes: TRoute[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];

// create browser router

const router = createBrowserRouter(allRoutes);

export default router;
