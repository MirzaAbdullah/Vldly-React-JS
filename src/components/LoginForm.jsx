import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // to Update the state when their is change in input field
  handleChange = ({ currentTarget: input }) => {
    const { account, errors } = this.state;

    const errorsArr = { ...errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errorsArr[input.name] = errorMessage;
    else delete errorsArr[input.name];

    const accountArr = { ...account };
    accountArr[input.name] = input.value;

    this.setState({ account: accountArr, errors: errorsArr });
  };

  validateProperty = ({ name, value }) => {
    //To build dynamic property to validate per field
    const property = { [name]: value };

    //To define dynamic schema only for per field
    const schema = { [name]: this.schema[name] };

    //Pass params to JOI
    const { error } = Joi.validate(property, schema);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = e => {
    //Prevent from default behaviour of form submission
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    //Call to Server
    console.log("Submitted");
  };

  render() {
    //object destructuring
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            type="text"
            value={account.value}
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
