import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Nav.css";

const { Header } = Layout;
const { Title } = Typography;

const Nav: React.VFC = (): JSX.Element => {
  return (
    <Header>
      <div className="logo">
      <Title level={2} style={{ color: "white", margin: 7 }}>
            WITH <div style={{ display: "inline", color: "#1890ff" }}>U</div>
          </Title>
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link className="link-item" to="/contact" component={Typography.Link}>
            Contact us
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Nav;
