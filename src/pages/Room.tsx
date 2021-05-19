import React from "react";
import ReactPlyr, { Provider } from "../components/ReactPlyr";
import Chat from "../components/Chat";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

const { Content, Sider } = Layout;

const Room: React.VFC = (): JSX.Element => {
  let { id, link } = useParams<{ id: string; link: string }>();

  socket.emit("join_room", id);

  const sources = [
    {
      src: decodeURIComponent(link),
      provider: "youtube" as Provider,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width="300"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Chat id={id} />
      </Sider>
      <Content>
        <div className="site-layout-background">
          <ReactPlyr sources={sources} type="video" id={id} />
        </div>
      </Content>
    </Layout>
  );
};

export default Room;
