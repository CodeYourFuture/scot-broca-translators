import React from "react";
import { Menu, Image, Container, Dropdown } from "semantic-ui-react";
import NavBarMenuItems from "./NavBarMenuItems";
import { isLoggedIn } from "../helpers/isLoggedIn";
import { logout } from "../helpers/logout";

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
      {isLoggedIn() ? (
        <Menu.Menu position="right">
          <Dropdown item icon="user">
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout} header name="logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      ) : null}
    </Container>
  </Menu>
);

export default NavBarDesktop;
