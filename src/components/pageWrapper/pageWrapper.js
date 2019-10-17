import React from "react";
import styled from "styled-components";
import { Header } from "../homepage/components/header";

const PageWrapper = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`;

export { PageWrapper };
