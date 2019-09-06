import React, { Component } from "react";
import { getDocumentById } from "../api/documents";

export class AddTranslationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      document: {}
    };
  }
  componentDidMount() {
    let documentId = this.props.match.params.documentId;
    getDocumentById(documentId)
      .then(document => this.setState({ document: document }))
      .catch(err => console.log(err));
  }

  render() {
    const document = this.state;
    {
      console.log(document);
    }
    return <div>Document</div>;
  }
}

export default AddTranslationForm;
