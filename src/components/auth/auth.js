import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../pageWrapper";
import { StyledTextHeading1 } from "../styledText";
import { FormInput } from "../homepage/components/forms";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.page = props.children;
    this.priv = props.level;
    localStorage.setItem("password",'');
    this.state = {
      password: null,
      validated: localStorage.getItem('user').valueOf()

  };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.validate();
  }

  validate() {
    if (!(localStorage.getItem("user").valueOf() === 'user') || !(localStorage.getItem("user").valueOf() === 'admin') ) {
      if (localStorage.getItem("password").valueOf() === "dogsandcats123") {
       this.setState({validated : "admin"});
        localStorage.setItem("user", "admin");
      } else if (localStorage.getItem("password").valueOf() === "password1!") {
        console.log(this.state.validated)
        this.setState({validated : "user"});
        localStorage.setItem("user", "user");
      }
    }else{
      if (localStorage.getItem("user").valueOf() === "admin") {
        this.setState({validated : "admin"});
      } else if (localStorage.getItem("user").valueOf() === "user") {
        this.setState({validated : "user"});
      }
    }
    console.log(this.state.validated === this.priv)

  }

  handleSubmit(event) {
    localStorage.setItem("password", this.state.password);
    this.validate();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.validated === this.state.validated;
  }

  render() {
    if (this.state.validated === this.priv || (this.state.validated === 'admin') ){
      return this.page;
    } else {
      return (
        <Container>
          <StyledTextHeading1 style={{ alignItems: "center" }}>
            You do not have access to this section.
          </StyledTextHeading1>
          <FormBody>
            {/*<FormInput*/}
            {/*  name={"password"}*/}
            {/*  value={this.state.password}*/}
            {/*  placeholder={"Password"}*/}
            {/*  handleChange={this.handleInputChange}*/}
            {/*/>*/}
            <FormInput
              name={"password"}
              value={this.state.password}
              placeholder={"Password"}
              handleChange={this.handleInputChange}
            />
            <SubmitButton onClick={this.handleSubmit}>Login</SubmitButton>
          </FormBody>
        </Container>
      );
    }
  }
}



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  flex-direction: column;
  width: 40%;
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

export { Auth };
