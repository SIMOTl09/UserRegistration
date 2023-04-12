import React from "react";
import ReactDOM from "react-dom/client";
// 样式初始化一般放在最前面
import "reset-css"
// 全局样式
import "@/assets/styles/global.scss"

import { BrowserRouter } from "react-router-dom"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
