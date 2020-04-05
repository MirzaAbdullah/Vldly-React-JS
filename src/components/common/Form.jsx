import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    error: {}
  };

  // to Update the state when their is change in input field
  handleChange = ({ currentTarget: input }) => {
    const { data, errors } = this.state;

    const errorsArr = { ...errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errorsArr[input.name] = errorMessage;
    else delete errorsArr[input.name];

    const dataArr = { ...data };
    dataArr[input.name] = input.value;

    this.setState({ data: dataArr, errors: errorsArr });
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
    const { error } = Joi.validate(this.state.data, this.schema, options);

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

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    //object destructuring
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        type={type}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    //object destructuring
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
