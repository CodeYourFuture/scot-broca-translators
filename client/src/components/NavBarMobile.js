import React from "react";
import {
  Menu,
  Image,
  Container,
  Responsive,
  Sidebar,
  Icon
} from "semantic-ui-react";
import NavBarMenuItems from "./ NavBarMenuItems";

const NavBarMobile = ({ children, onPusherClick, onToggle, visible }) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
    >
      <NavBarMenuItems />
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu inverted>
        <Menu.Item>
          <Image
            size="mini"
            src="https://image.flaticon.com/icons/svg/2014/2014350.svg"
          />
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default NavBarMobile;
