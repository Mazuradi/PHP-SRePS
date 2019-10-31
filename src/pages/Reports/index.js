import styled from "styled-components";
import React from "react";
import { PageWrapper } from "../../components/pageWrapper";
import { RawCSVButton, SalesCSVButton } from "../../components/downloadButtons";

const ReportsRoot = () => (
  <PageWrapper>
    <RawCSVButton/>
    <SalesCSVButton/>
  </PageWrapper>
);

export default ReportsRoot;
