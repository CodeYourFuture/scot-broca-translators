import React, { Component } from "react";

export class AddTranslationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      document: {}
    };
  }
  componentDidMount() {
    console.log(this.props);
    let documentId = this.props.match.params.documentId;

    this.setState({
      document
    });
  }

  render() {
    return <div>Document</div>;
  }
}

export default AddTranslationForm;
