import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

class SortableHeaderCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSorted: null
    };
  }

  handleClick = () => {
    this.setState({ isSorted: !this.state.isSorted }, () => {
      const { sortKey } = this.props.headerCell;
      const { isSorted } = this.state;
      this.props.sortOnClick(sortKey, isSorted);
    });
  };

  render() {
    const { isSorted } = this.state;
    const { header } = this.props.headerCell;
    let sortIconName;
    if (isSorted === null) {
      sortIconName = "sort";
    } else if (isSorted) {
      sortIconName = "sort down";
    } else {
      sortIconName = "sort up";
    }

    return (
      <Table.HeaderCell onClick={this.handleClick}>
        <Icon fitted name={sortIconName} /> {header}
      </Table.HeaderCell>
    );
  }
}

export default SortableHeaderCell;
