import React from "react";
import styled from "styled-components";

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.placeholder = this.props.placeholder;
    this.state = { value: "" };

    this.handleChange = this.props.handleChange.bind(this);
  }

  render() {
    return (
      <InputWrapper
        name={this.props.name}
        value={this.value}
        onChange={this.handleChange}
        placeholder={this.placeholder}
      />
    );
  }
}

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: null,
      productRetail: null,
      productWholesale: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const state = this.state;
    if(state.productRetail && state.productName && state.productWholesale)
      alert('You created the product: ' + this.state.productName);
    else
      alert('Please use all fields');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Wrapper>
        <FormBody>
          <FormInput
            name={"productName"}
            value={this.state.productName}
            placeholder={"Product Name"}
            handleChange={this.handleInputChange}
          />
          <FormInput
            name={"productRetail"}
            value={this.state.productRetail}
            placeholder={"Product Retail Price"}
            handleChange={this.handleInputChange}
          />
          <FormInput
            name={"productWholesale"}
            value={this.state.productWholesale }
            placeholder={"Product Wholesale Price"}
            handleChange={this.handleInputChange}
          />
          <SubmitButton
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Create Product
          </SubmitButton>
        </FormBody>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

const InputWrapper = styled.input``;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const SubmitButton = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: black;
  text-decoration: none;
  background-color: gray;
  border: 2px solid gray;
  &:hover {
    background-color: #ffffff;
  }
`;

export { ProductForm };
