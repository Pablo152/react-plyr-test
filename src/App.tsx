import React from "react";
import "./App.css";
import { Layout } from "antd";
import Room from "./pages/Room";
import Chat from "./components/Chat"

const { Content, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <div className="site-layout-background">
          <Room />
        </div>
      </Content>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width="300"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Chat />
      </Sider>
    </Layout>
  );
}

export default App;
