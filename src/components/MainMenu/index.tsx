import {
  PieChartOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Menu } from 'antd';
import { useNavigate, useLocation} from "react-router-dom"
type MenuItem = Required<MenuProps>['items'][number];
// 登录请求到数据之后，就可以跟items这个数组进行匹配
const items: MenuItem[] = [
  {
    label: '首页',
    key: '/page1',
    icon: <PieChartOutlined />
  }
]

const Comp: React.FC = () => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation();
  
  const menuClick = (e:{key:string})=>{
    navigateTo(e.key);
  }

  return (
    <Menu 
        theme="dark" 
        defaultSelectedKeys={[currentRoute.pathname]} 
        mode="inline" 
        // 菜单项的数据
        items={items} 
        onClick={menuClick}
      />
  )
}
export default Comp;