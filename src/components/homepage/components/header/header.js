import React from "react";
import styled from "styled-components";
import { StyledTextHeading1, StyledLink} from "../../../styledText";
import { ButtonUnStyled } from "../../../button";

const Header = () => (
  <Wrapper>
    <StyledLink to={'/'}><HeaderTitle>PHPSREP</HeaderTitle></StyledLink>
    <HeaderButton buttonText={"Products"} linkURL={"/Products"} />
    <HeaderButton buttonText={"Stock"} linkURL={"/Stock"} />
    <HeaderButton buttonText={"Transactions"} linkURL={"/Transactions"} />
    <HeaderButton buttonText={"Reports"} linkURL={"/Reports"} />
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
  background-color: rgb(85, 26, 139);
  color: white;
`;

const HeaderTitle = styled(StyledTextHeading1)`
  padding-left: 30px;
`;

export { Header };
