import { TransactionForm } from "../../components/forms/transactionForm";
import React from "react";
//import styled from "styled-components";
//import { Header } from "../../components/homepage/components/header";
import { PageWrapper } from "../../components/pageWrapper";

const TransactionsRoot = () => (
  <PageWrapper>
    <TransactionForm/>
  </PageWrapper>
);

//const Wrapper = styled.div``;

export default TransactionsRoot;