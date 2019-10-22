import React from "react";
import styled from "styled-components";
//     <main>
//         <h1>Transactions</h1>
//         <p>Transaction Type</p>
//     </main>
// )

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
        <InputWrapper
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
        product_id: null,
        stock_id: null,
        date: null,
        quantity: null,
        sale_id: null
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    //fix validation
    handleSubmit(event) {
      const state = this.state;
      if(!state.transactionType)
        alert("Please select a transaction type");
      else if (!state.product_id)
        alert('Please enter a Product ID');
      else if(!state.stock_id)
        alert('Please enter a Stock ID');
      else if(!state.date)
        alert('Please enter a date');
      else if(!state.quantity)
        alert('Please enter a quantity');
      else if(!state.sale_id)
        alert('Please enter a Sale ID');  
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
            name={"product_id"}
            value={this.state.product_id }
            placeholder={"Product ID"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"stock_id"}
            value={this.state.stock_id }
            placeholder={"Stock ID"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"date"}
            value={this.state.date }
            placeholder={"Date"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"quantity"}
            value={this.state.quantity }
            placeholder={"Quantity"}
            handleChange={this.handleInputChange}
            />
            <FormInput
            name={"sale_id"}
            value={this.state.sale_id }
            placeholder={"Sale ID"}
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

export {TransactionForm}