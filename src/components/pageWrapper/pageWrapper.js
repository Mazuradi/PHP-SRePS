import React from "react";
import styled from "styled-components";
import { Header } from "../homepage/components/header";
import { Auth } from "../auth";

const PageWrapper = ({ children, level = 'user' }) => (
  <Auth level={level}>
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  </Auth>
);

const Wrapper = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`;

export { PageWrapper };
