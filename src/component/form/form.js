import React, { Component } from 'react';

function formHOC(Comp) {
  return class WrapperComp extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, val) {
      this.setState({
        [key]: val
      });
    }

    render() {
      return <Comp {...this.props} state={this.state} handleChange={this.handleChange}></Comp>
    }
  }
}

export default formHOC;