import React from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";
import {
  Menu,
  Image,
  Container,
  Responsive,
  Sidebar,
  Icon
} from "semantic-ui-react";

class NavBar extends React.Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          >
            <Container>{children}</Container>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop />
          <Container>{children}</Container>
        </Responsive>
      </div>
    );
  }
}
export default NavBar;
