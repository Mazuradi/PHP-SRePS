import React from "react";
import styled from "styled-components";

class RadioInput extends React.Component {
    constructor(props) {
      super(props);
      this.name = this.props.name;
      this.id = this.props.id;
      this.type = this.props.type;
      this.value = this.props.value;
      this.state = { value: "" };
  
      this.handleChange = this.props.handleChange.bind(this);
    }
  
    render() {
      return (
        <RadioInputWrapper
          name={this.name}
          id={this.id}
          type={this.type}
          value={this.value}
          onChange={this.handleChange}
        />
      );
    }
}

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

  
class TransactionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        transactionType: null,
        productname: null,
        quantity: null,
        exprdate: null
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
      const state = this.state;
      if(!state.transactionType)
        alert("Please select a transaction type");
      else if (!state.productname)
        alert('Please enter a Product Name');
      else if(!state.quantity)
        alert('Please enter a Quantity'); 
      else if(!state.exprdate)
        alert('Please enter an Expiry Date in the form YYYY-MM-DD');
      else
        alert('Transaction Added');
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
            <label for="transactionType">Sale</label>  
            <RadioInput
              name={"transactionType"}
              id={"Sale"}
              type={"radio"}
              value={"Sale"}
              handleChange={this.handleInputChange}
            />
            <label for="transactionType">Refund</label>  
            <RadioInput
              name={"transactionType"}
              id={"Refund"}
              type={"radio"}
              value={"Refund"}
              handleChange={this.handleInputChange}
            />
            <FormInput
            name={"productname"}
            value={this.state.product_id}
            placeholder={"Product Name"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"quantity"}
            value={this.state.quantity}
            placeholder={"Quantity"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"exprdate"}
            value={this.state.exprdate}
            placeholder={"Expiry Date: YYYY-MM-DD"}
            handleChange={this.handleInputChange}
            />
            <SubmitButton
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Submit Transaction
            </SubmitButton>
          </FormBody>
        </Wrapper>
      );
    }
}

const RadioInputWrapper = styled.input`
height: 20px;
border-radius: 4px;
width: 100%;
margin-bottom: 10px;
`;

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

export {TransactionForm}