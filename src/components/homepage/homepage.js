import React from "react";
import styled from "styled-components";
import { Header } from "./components/header";
import { ProductForm } from "./components/forms";

const Homepage = () => (
  <Wrapper>
    <Header />
    <ProductForm/>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export { Homepage };
