import React from "react";
import ReactPlyr, { Provider, Event } from "../components/ReactPlyr";
import Chat from "../components/Chat";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

const { Content, Sider } = Layout;

const Room: React.VFC = (): JSX.Element => {
  let { link } = useParams<{ id: string; link: string }>();

  const sources = [
    {
      src: decodeURIComponent(link),
      provider: "youtube" as Provider,
    },
  ];

  const onPlay = (event: Event): void => {
    console.log("HELLO FROM PARENT", event);
  };

  const onSeeking = (event: Event): void => {
    console.log("HELLO FROM PARENT -- Seeking", event);
  };

  const onPause = (event: Event): void => {
    console.log("HELLO FROM PARENT -- Pause", event);
  };

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
        <Chat />
      </Sider>
      <Content>
        <div className="site-layout-background">
          <ReactPlyr
            sources={sources}
            type="video"
            onPlay={onPlay}
            onSeeking={onSeeking}
            onPause={onPause}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Room;
