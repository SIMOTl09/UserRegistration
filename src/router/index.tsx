import React,{ lazy } from "react"
// Navigate重定向组件
import { Navigate } from "react-router-dom"
import Layout from  "@/layout"
const Page1 = lazy(()=>import("../views/RegistrationList"))
const Page2 = lazy(()=>import("../views/RegistrationForm"))

const withLoadingComponent = (comp:JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
  </React.Suspense>
)

const routes = [
  //  嵌套路由 开始-------------------
  {
    path:"/",
    element:<Navigate to="/home"/>
  },
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        path:"/page1",
        element: withLoadingComponent(<Page1 />)
      },
      {
        path:"/page2",
        element: withLoadingComponent(<Page2 />)
      },
    ]
  },
  // 访问其余路径的时候直接跳到首页
  {
    path:"*",
    element:<Navigate to="/page1"/>
  }
]

export default routes