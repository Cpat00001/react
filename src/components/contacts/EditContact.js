import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  //fetch data from API
  async componentDidMount() {
    // assign decontructed id to id from props using method match.params
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    //set response data to variable
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };
  onSubmit = async (dispatch, e) => {
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
    //HTTP PUT request
    //create const to send updated contact - name,email,phone come from const {name,email,phone} = this.state; above
    const updContact = {
      name,
      email,
      phone
    };
    //get id for url
    const { id } = this.props.match.params;
    //get data from API by URL and add ID from const {id} to get proper user
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    //create dispatch which update data in switch in context.js
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
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
              <div className="card-header">Edit contact</div>
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
                    value="Update Contact"
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
export default EditContact;
