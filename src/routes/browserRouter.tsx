import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/UI/auth/Login";
import { ReactNode } from "react";
import PageNotFound from "../utilities/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import Registration from "../components/UI/auth/Registration";
import CreateCategory from "../components/UI/category/CreateCategory";
import UpdateCategory from "../components/UI/category/UpdateCategory";
import CategoryList2 from "../components/UI/category/CategoryList2";
import CreateTable from "../components/UI/table/CreateTable";
import TableList from "../components/UI/table/TableList";
import UpdateTable from "../components/UI/table/UpdateTable";
import FoodList from "../components/UI/food/FoodList";
import CreateFood from "../components/UI/food/CreateFood";
import UpdateFood from "../components/UI/food/UpdateFood";
import CreateOrder from "../components/UI/order/CreateOrder";
import OrderList from "../components/UI/order/OrderList";
import UpdateOrder from "../components/UI/order/UpdateOrder";
import OrderActionStatus from "../components/UI/order/OrderActionStatus";
import IncomeReport from "../components/UI/reports/IncomeReport";

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
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <Registration />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-category",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <CreateCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-category/:categoryId",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <UpdateCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "category-list",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "admin",
              "manager",
              "owner",
              "administrator",
              "waiter",
              "cashier",
              "chef",
            ]}
          >
            <CategoryList2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-table",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <CreateTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "table-list",
        element: <TableList />,
      },
      {
        path: "update-table/:tableId",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <UpdateTable />
          </ProtectedRoute>
        ),
      },

      {
        path: "fooditem-list",
        element: <FoodList />,
      },
      {
        path: "create-food",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <CreateFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-food/:foodId",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <UpdateFood />
          </ProtectedRoute>
        ),
      },

      {
        path: "create-order",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "owner",
              "admin",
              "manager",
              "waiter",
              "cashier",
              "chef",
              "administrator",
            ]}
          >
            <CreateOrder />
          </ProtectedRoute>
        ),
      },

      {
        path: "update-order/:orderId",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "owner",
              "admin",
              "manager",
              "waiter",
              "cashier",
              "chef",
              "administrator",
            ]}
          >
            <UpdateOrder />
          </ProtectedRoute>
        ),
      },

      {
        path: "order-list",
        element: <OrderList />,
      },

      {
        path: "order-list-status",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "owner",
              "admin",
              "manager",
              "waiter",
              "cashier",
              "chef",
              "administrator",
            ]}
          >
            <OrderActionStatus />
          </ProtectedRoute>
        ),
      },

      {
        path: "income-report",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "owner", "administrator"]}
          >
            <IncomeReport />
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
