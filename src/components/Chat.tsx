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

const Chat = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string>("");

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
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  const data = [
    {
      actions: actions,
      author: <p>Han Solo</p>,
      avatar: (
        <Avatar
          style={{ color: "black", backgroundColor: "#fde3cf", margin: 5 }}
        >
          U
        </Avatar>
      ),
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip
          title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment().subtract(1, "days").fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: actions,
      author: <p>Han Solo</p>,
      avatar: (
        <Avatar
          style={{ color: "black", backgroundColor: "#d1edf2", margin: 5 }}
        >
          P
        </Avatar>
      ),
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip
          title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment().subtract(2, "days").fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <div>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={data}
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
        <TextArea rows={4} style={{ borderRadius: 10 }} />
        <Button
          type="primary"
          shape="round"
          style={{ float: "right", marginTop: 5 }}
          icon={<SendOutlined />}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
