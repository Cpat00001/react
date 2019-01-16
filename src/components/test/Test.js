import React, { Component } from "react";

class Test extends Component {
  state = {
    title: "",
    body: ""
  };
  //fetch data from url using componentDidMount() and function fetch(), then .then .this,setState and send data to State above title:"" body:""
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  // componentWillMount() {
  //   console.log("componentWillMount...");
  // }
  // componentDidUpdate() {
  //   console.log("componentDidUpdate...");
  // }
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
