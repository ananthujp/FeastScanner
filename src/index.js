import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login";
import Scan from "./scan";
import Home from "./Home";
import Entry from "./Entry";
import Add from "./Add";
import View from "./view";
import { AuthProvider } from "./reducerHook";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    ),
  },
  {
    path: "/entry/:pathID",
    element: (
      <App>
        <Entry path=":pathID" />
      </App>
    ),
  },
  {
    path: "/scan",
    element: (
      <App>
        <Scan />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "/add",
    element: (
      <App>
        <Add />
      </App>
    ),
  },
  {
    path: "/view",
    element: (
      <App>
        <View />
      </App>
    ),
  },
]);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
