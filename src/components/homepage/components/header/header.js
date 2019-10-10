import React from "react";
import styled from "styled-components";
import { StyledTextHeading1 } from "../../../styledText";
import { ButtonUnStyled } from "../../../button";

const Header = () => (
  <Wrapper>
    <HeaderTitle>PHPSREP</HeaderTitle>
    <HeaderButton buttonText={"Test"} linkURL={"/"} />
    <HeaderButton buttonText={"hello"} linkURL={"/hello"} />
    <HeaderButton buttonText={"Test"} linkURL={"/"} />
    <HeaderButton buttonText={"Test"} linkURL={"/"} />
  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex: 1;
`;

const HeaderButton = styled(ButtonUnStyled)`
  margin-right: 32px;
  margin-left: 32px;
`;

const HeaderTitle = styled(StyledTextHeading1)`
  padding-left: 30px;
`;

export { Header };
