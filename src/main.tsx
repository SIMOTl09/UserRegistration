import React from "react";
import ReactDOM from "react-dom/client";

// 全局样式
import "@/assets/styles/global.scss"

import { BrowserRouter } from "react-router-dom"
import App from "./App";

import {Provider} from "react-redux"
import store from "@/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
