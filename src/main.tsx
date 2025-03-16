import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/browserRouter.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // store Provider
  <Provider store={store}>
    {/* persist gate */}
    <PersistGate persistor={persistor}>
      {/* router provider */}
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
