import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

class SortableHeaderCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSorted: true
    };
  }

  handleClick = event => {
    this.setState({ isSorted: !this.state.isSorted }, () => {
      const { sortKey } = this.props.headerCell;
      const { isSorted } = this.state;
      this.props.sortOnClick(sortKey, isSorted);
    });
  };

  render() {
    const { isSorted } = this.state;
    const { header } = this.props.headerCell;
    let sortIconName = "sort up";
    if (isSorted) {
      sortIconName = "sort down";
    }

    return (
      <Table.HeaderCell onClick={this.handleClick} id={this.props.id}>
        <Icon fitted name={sortIconName} /> {header}
      </Table.HeaderCell>
    );
  }
}

export default SortableHeaderCell;
