import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StyledTextHeading3 } from "../styledText";

const ButtonUnStyled = ({ buttonText, linkURL , className}) => (
    <Wrapper to={linkURL} className={className}>  <StyledTextHeading3>{buttonText}</StyledTextHeading3></Wrapper>
);

const Wrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: black;
  background-color: rgb(85, 26, 139);;
  border: 2px solid gray;
  &:hover {
    background-color: #ffffff;
  }
`;

export { ButtonUnStyled };
