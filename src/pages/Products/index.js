import { ProductForm } from "../../components/homepage/components/forms";
import React from "react";
import styled from "styled-components";
import { Header } from "../../components/homepage/components/header";

const ProductRoot = () => (
  <Wrapper>
    <Header />
    <ProductForm />

  </Wrapper>
);

const Wrapper = styled.div``;

export default ProductRoot;
