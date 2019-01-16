import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };
  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //check fields if empty

    if (name === "") {
      this.setState({ errors: { name: "Name is required..." } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required..." } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required..." } });
      return;
    }
    const newContact = {
      name,
      email,
      phone,
      errors: {}
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", newContact)
      .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));

    //clear input fields after added user
    this.setState({
      name: "",
      email: "",
      phone: ""
    });
    this.props.history.push("/");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    palceholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                    required
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    palceholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    palceholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light cursor:pointer"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
