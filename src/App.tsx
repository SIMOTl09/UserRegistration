import { useEffect } from 'react'
import { useRoutes, useLocation,useNavigate } from "react-router-dom"
import router from "./router"
import { message } from "antd"

function App() {  
  const outlet = useRoutes(router);
  
  return (
    <div className="App">
      {outlet}
    </div>
  )
}

export default App
