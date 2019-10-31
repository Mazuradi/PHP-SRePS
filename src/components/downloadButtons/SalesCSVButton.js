import React from "react";
import styled from "styled-components";


class SalesCSVButton extends React.Component{
  handleSubmit(){
      fetch('http://localhost:1337/csvdata/generatecsvsales')
  }

  render() {
    return(<SubmitButton onClick={this.handleSubmit()}>Sales Report</SubmitButton>)
  }
}

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

export {SalesCSVButton}