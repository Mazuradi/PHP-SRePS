import { ProductForm } from "../../components/homepage/components/forms";
import React from "react";
import styled from "styled-components";
import { Header } from "../../components/homepage/components/header";
import { PageWrapper } from "../../components/pageWrapper";

const ProductRoot = () => (
  <PageWrapper>
    <ProductForm />

  </PageWrapper>
);

const Wrapper = styled.div``;

export default ProductRoot;
