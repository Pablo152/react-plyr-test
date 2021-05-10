import React, { CSSProperties, useState } from "react";
import { Typography, Button, Modal, Input } from "antd";
import "./Banner.css";

import { TwitterOutlined, FacebookFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ParagraphStyle: CSSProperties = {
  color: "white",
  textAlign: "center",
};

const inlineDivStyle: CSSProperties = {
  display: "inline",
  color: "#1890ff",
};

const Banner: React.VFC = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="box">
        <div className="inner-box">
          <Title style={ParagraphStyle}>
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
            <Button onClick={showModal} ghost type="primary">
              Create room
            </Button>
          </Paragraph>
          <Paragraph style={ParagraphStyle}>
            <Button type="primary">
              <TwitterOutlined />
            </Button>
            <Button type="primary" style={{ marginLeft: 7 }}>
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
        <Input placeholder="https://www.youtube.com/watch?v=H8HCL8YOSbo" />
      </Modal>
    </>
  );
};

export default Banner;
