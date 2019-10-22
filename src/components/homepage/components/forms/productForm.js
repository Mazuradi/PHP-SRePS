import React from "react";
import styled from "styled-components";
import { StyledTextHeading2 } from "../../../styledText";

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
      <div style={{ width: "100%" }}>
        <InputWrapper
          name={this.props.name}
          value={this.value}
          onChange={this.handleChange}
          placeholder={this.placeholder}
        />
      </div>
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
    if (state.productRetail && state.productName && state.productWholesale) {
      alert("You created the product: " + this.state.productName);
      // const newProd = new Product(state.productName, state.productWholesale, state.productRetail) ;
      // newProd.insertProduct();
    } else alert("Please use all fields");
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
        <StyledTextHeading2>Create a Product</StyledTextHeading2>
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
            value={this.state.productWholesale}
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputWrapper = styled.input`
  height: 40px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 36px;
`;

const FormBody = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
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
  max-width: 400px;
  height: 40px;
  &:hover {
    background-color: #ffffff;
  }
  font-size: 40px;

  padding-right: 20px;
  padding-left: 20px;
`;

export { ProductForm };
