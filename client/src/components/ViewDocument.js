import React, { Component } from "react";

export class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://localhost:4000/api/documents/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data.content);
        this.setState({
          document: data.content
        });
      });
  }
  render() {
    const { document } = this.state;
    return (
      <div>
        <p>{document}</p>
      </div>
    );
  }
}

export default ViewDocument;
