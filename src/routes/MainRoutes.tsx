import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/UI/Login";
import Registration from "../components/UI/Registration";
import CategoryList from "../components/UI/CategoryList";
import CreateCategory from "../components/UI/CreateCategory";
import UpdateCategory from "../components/UI/UpdateCategory";

export const router = createBrowserRouter([
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
      
    ],
  },
]);