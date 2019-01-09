import React, { Component } from "react";
import Contact from "./components/Contact";
import Header from "./components/Header.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Contact
            name="John Doe"
            email="jdoes@gmail.com"
            phone="555-555-5544"
          />
          <Contact
            name="Sara William"
            email="swill@gmail.com"
            phone="333-333-333"
          />
        </div>
      </div>
    );
  }
}

export default App;
