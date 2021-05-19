import React, { CSSProperties, useState } from "react";
import { Typography, Button, Modal, Input } from "antd";
import "./Banner.css";

import { TwitterOutlined, FacebookFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ParagraphStyle: CSSProperties = {
  color: "white",
  textAlign: "center",
};

const inlineDivStyle: CSSProperties = {
  display: "inline",
  color: "#1890ff",
};

const generateUUID = (): string => {
  let d = new Date().getTime(),
    d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
};

const Banner: React.VFC = (): JSX.Element => {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoQuery, setVideoQuery] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const videoUrl = encodeURIComponent(videoQuery);
    const UUID = generateUUID();
    history.push(`/room/${UUID}/${videoUrl}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="box">
        <div className="inner-box">
          <Title level={2} style={ParagraphStyle}>
            WITH <div style={inlineDivStyle}>U</div>
          </Title>
          <Paragraph style={ParagraphStyle}>
            WITH<div style={inlineDivStyle}>U</div> is a new way to watch videos
            with your long distance friends
          </Paragraph>
          <Paragraph style={ParagraphStyle}>
            Get group chats and sync videos
          </Paragraph>
          <Paragraph style={ParagraphStyle}>
            <Button onClick={showModal} type="primary">
              Create room
            </Button>
          </Paragraph>
          <Paragraph style={ParagraphStyle}>
            <Button ghost type="primary">
              <TwitterOutlined />
            </Button>
            <Button ghost type="primary" style={{ marginLeft: 7 }}>
              <FacebookFilled />
            </Button>
          </Paragraph>
        </div>
      </div>
      <Modal
        title={
          <>
            <Title level={2}>
              WITH <div style={inlineDivStyle}>U</div>
            </Title>
            <Title
              level={5}
              style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: -7 }}
            >
              Create room
            </Title>
          </>
        }
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph>Insert Youtube / Vimeo link</Paragraph>
        <Input
          onChange={(ev) => setVideoQuery(ev.target.value)}
          placeholder="https://www.youtube.com/watch?v=H8HCL8YOSbo"
        />
      </Modal>
    </>
  );
};

export default Banner;
