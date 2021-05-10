import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Nav.css";

const { Header } = Layout;
const { Title } = Typography;

const Nav: React.VFC = (): JSX.Element => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item disabled>
          <Title style={{ color: "white", margin: 7 }}>
            WITH <div style={{ display: "inline", color: "#1890ff" }}>U</div>
          </Title>
        </Menu.Item>
        <Menu.Item key="1">
          <Link className="link-item" to="/home" component={Typography.Link}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className="link-item" to="/contact" component={Typography.Link}>
            Contact us
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Nav;
