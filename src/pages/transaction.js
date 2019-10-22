import React from "react"
import styled from "styled-components";
import { TransactionForm } from "../components/forms/transactionForm";
import { Header } from "../components/homepage/components/header/header";

const TransactionPage = () => (
    <Wrapper>
        <Header />
        <TransactionForm />
    </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default () => (<TransactionPage/>);

