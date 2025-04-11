import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/UI/Login";
import { ReactNode } from "react";
import Registration from "../components/UI/Registration";
import PageNotFound from "../utilities/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/Layout/DashboardLayout";
import CreateCategory from "../components/UI/CreateCategory";
import UpdateCategory from "../components/UI/UpdateCategory";
import CategoryList from "../components/UI/CategoryList";
import CategoryList2 from "../components/UI/CategoryList2";

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
        path: "create-category",
        element: (<ProtectedRoute allowedRoles={['admin', 'manager']}>
          <CreateCategory />
        </ProtectedRoute>),
      },
      {
        path: "update-category/:categoryId",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <UpdateCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "category-list",
        element: (
          <ProtectedRoute allowedRoles={['admin','manager']}>
            <CategoryList2 />
          </ProtectedRoute>
        ),
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
