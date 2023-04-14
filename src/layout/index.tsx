
import { Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import { Outlet,useNavigate } from "react-router-dom"
import MainMenu from "@/components/MainMenu"
const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const navigateTo = useNavigate()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左边侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} trigger={null}>
        <div className="logo"></div>
        <MainMenu></MainMenu>
      </Sider>
      {/* 右边内容 */}
      <Layout className="site-layout">
        {/* 右边头部 */}
        <Header className="site-layout-background" style={{ paddingLeft: '16px' }} >
          {/* 面包屑 */}
        </Header>
        {/* 右边内容部分-白色底盒子 */}
        <Content style={{ margin: '16px 16px 0', minWidth: '800px' }} className="site-layout-background">
            {/* 窗口部分 */}
            <Outlet />
        </Content>
        {/* 右边底部 */}
        {/* <Footer style={{ textAlign: 'center', padding:0, lineHeight:"48px" }}>Ant Design</Footer> */}
      </Layout>
    </Layout>
  );
};

export default View;