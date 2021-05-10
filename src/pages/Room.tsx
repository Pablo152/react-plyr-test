import React from "react";
import ReactPlyr, { Provider, Event } from "../components/ReactPlyr";
import Chat from "../components/Chat";
import { Layout } from "antd";

const { Content, Sider } = Layout;

const Room: React.VFC = (): JSX.Element => {
  const sources = [
    {
      src: "https://www.youtube.com/watch?v=pV6VauzOwTk",
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
    <Layout>
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
};

export default Room;
