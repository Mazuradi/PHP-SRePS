import React from "react";
import styled from "styled-components";
import { StyledTextHeading2 } from "../styledText";

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
      productname: null,
      quantity: null,
      exprdate: null
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaleSubmit = this.handleSaleSubmit.bind(this);
    this.handleRefundSubmit = this.handleRefundSubmit.bind(this);
  }
    
  handleSaleSubmit(event) {
    const state = this.state;
    if (!state.productname)
      alert('Please enter a Product Name');
    else if(!state.quantity)
      alert('Please enter a Quantity'); 
    else if(!state.exprdate)
      alert('Please enter an Expiry Date in the form YYYY-MM-DD');
    else
    {
      alert('Transaction Added');
      fetch("http://localhost:1337/transaction/addsaletransaction", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        productName: this.state.productname,
        quantity: this.state.quantity,
        exprdate: this.state.exprdate
      }),
      }).then((result) => result.json());
    }
  }

  handleRefundSubmit(event) {
    const state = this.state;
    if (!state.productname)
      alert('Please enter a Product Name');
    else if(!state.quantity)
      alert('Please enter a Quantity'); 
    else if(!state.exprdate)
      alert('Please enter an Expiry Date in the form YYYY-MM-DD');
    else
    {
      alert('Transaction Added');
      fetch("http://localhost:1337/transaction/addrefundtransaction", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          productName: this.state.productname,
          quantity: this.state.quantity,
          exprdate: this.state.exprdate
        }),
        }).then((result) => result.json());
    }
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
      <StyledTextHeading2>Transactions</StyledTextHeading2>
        <FormBody>
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
            onClick={this.handleSaleSubmit}
          >
            Sale
          </SubmitButton>
          <SubmitButton
            type="submit"
            value="Submit"
            onClick={this.handleRefundSubmit}
          >
            Refund
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
  margin: 10px;
  padding-right: 20px;
  padding-left: 20px;
`;

export {TransactionForm};