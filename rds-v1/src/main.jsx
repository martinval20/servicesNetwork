import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { app, auth } from "./firebaseConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { ChatContextProvider } from "./components/common/context/ChatContext";
import { AuthContext, AuthContextProvider } from "./components/common/context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  </AuthContextProvider>
);
