import React, { useState, createElement } from "react";
import { Input, Button, Comment, List, Tooltip, Avatar } from "antd";
import {
  SendOutlined,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;

type message = {
  actions: JSX.Element[];
  author: JSX.Element;
  avatar: JSX.Element;
  content: JSX.Element;
  datetime: JSX.Element;
};

const Chat = () => {
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [action, setAction] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
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
          style={{ color: "black", backgroundColor: "#fde3cf", margin: 5 }}
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

  const createMessage = () => {
    const author = "Pablo";
    const content = message;
    const datetime_title = moment().format("YYYY-MM-DD HH:mm_ss");
    const datetime_span = moment().fromNow();

    setMessages(
      messages.concat({
        actions: actions,
        author: <p>{author}</p>,
        avatar: (
          <Avatar
            style={{ color: "black", backgroundColor: "#fde3cf", margin: 5 }}
          >
            {author.charAt(0).toUpperCase() + author.charAt(1).toUpperCase()}
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
  };

  return (
    <>
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
