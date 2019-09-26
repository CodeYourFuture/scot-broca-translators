import React from "react";
import { Menu, Image, Container } from "semantic-ui-react";
import NavBarMenuItems from "./NavBarMenuItems";

const NavBarDesktop = () => (
  <Menu inverted>
    <Container>
      <Menu.Item>
        <Image
          size="mini"
          src="https://image.flaticon.com/icons/svg/2014/2014350.svg"
        />
      </Menu.Item>

      <NavBarMenuItems />
    </Container>
  </Menu>
);

export default NavBarDesktop;
