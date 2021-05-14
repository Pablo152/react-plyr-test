import React, {
  useState,
  createElement,
  useEffect,
  useRef,
  MouseEvent,
} from "react";
import {
  Input,
  Button,
  Comment,
  List,
  Tooltip,
  Avatar,
  Modal,
  Typography,
  Row,
  Col,
} from "antd";
import {
  SendOutlined,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import moment from "moment";
import { TwitterPicker, ColorResult } from "react-color";

const { TextArea } = Input;
const { Title } = Typography;

type message = {
  actions: JSX.Element[];
  author: JSX.Element;
  avatar: JSX.Element;
  content: JSX.Element;
  datetime: JSX.Element;
};

interface author {
  name: string;
  color: string;
}

const Chat = () => {
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [action, setAction] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("Withu");
  const [color, setColor] = useState<string>("#1890ff");
  const [author, setAuthor] = useState<author>({
    name: "Withu",
    color: "#1890ff",
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const avatarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  if (avatarRef.current) {
    avatarRef.current.onclick = () => {
      setIsModalVisible(true);
    };
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={() => setLikes(1)}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={() => setDislikes(1)}>
        {createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  const [messages, setMessages] = useState<message[]>([
    {
      actions: actions,
      author: <p>Withu</p>,
      avatar: (
        <Avatar
          style={{ color: "black", backgroundColor: "#1890ff", margin: 5 }}
        >
          WU
        </Avatar>
      ),
      content: <p>Enjoy!</p>,
      datetime: (
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm_ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      ),
    },
  ]);

  const createMessage = (el: any) => {
    el.preventDefault();
    const name = author.name;
    const content = message;
    const datetime_title = moment().format("YYYY-MM-DD HH:mm_ss");
    const datetime_span = moment().fromNow();

    setMessages(
      messages.concat({
        actions: actions,
        author: <p>{name}</p>,
        avatar: (
          <Avatar
            ref={avatarRef}
            style={{ color: "black", backgroundColor: author.color, margin: 5 }}
          >
            {name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}
          </Avatar>
        ),
        content: <p>{content}</p>,
        datetime: (
          <Tooltip title={datetime_title}>
            <span>{datetime_span}</span>
          </Tooltip>
        ),
      })
    );
    setMessage("");
  };

  const handleOk = () => {
    setAuthor({
      name,
      color,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setName(author.name || "Withu");
    setColor(author.color || "#1890ff");
    setIsModalVisible(false);
  };

  const setNameState = (el: React.ChangeEvent<HTMLInputElement>) => {
    setName(el.target.value);
  };

  const setColorState = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColor(color.hex);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={
          <>
            <Title level={2}>
              WITH <div style={{ display: "inline", color: "#1890ff" }}>U</div>
            </Title>
            <Title
              level={5}
              style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: -7 }}
            >
              Set-up your user
            </Title>
          </>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row justify="start">
          <Col span={3}>
            <Avatar
              size="large"
              style={{
                color: "black",
                backgroundColor: color,
                marginBottom: 10,
              }}
            >
              {name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={12}>
            <Input
              style={{ marginTop: 4, marginLeft: -5 }}
              onChange={setNameState}
              placeholder={author.name}
            ></Input>
          </Col>
        </Row>
        <TwitterPicker onChangeComplete={setColorState} />
      </Modal>
      <div>
        <List
          className="comment-list"
          style={{
            overflowY: "auto",
            maxHeight: "82vh",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <li>
              <Comment
                style={{ background: "white", margin: 15, padding: 2 }}
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>

      <div style={{ position: "absolute", bottom: 0, padding: 20 }}>
        <TextArea
          rows={4}
          value={message}
          style={{ borderRadius: 10 }}
          onChange={(el) => setMessage(el.target.value)}
          onPressEnter={createMessage}
        />
        <Button
          type="primary"
          shape="round"
          style={{ float: "right", marginTop: 5 }}
          icon={<SendOutlined />}
          onClick={createMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
