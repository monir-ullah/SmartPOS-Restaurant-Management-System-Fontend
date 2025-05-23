import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/UI/auth/Login";
import Registration from "../components/UI/auth/Registration";

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