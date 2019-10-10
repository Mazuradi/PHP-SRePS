import styled from "styled-components";
import React from "react";

const StyledText = ({
  color,
  style = { fontFamily: "ff-meta-serif-web-pro" },
  children,
  ...rest
}) => {
  return (
    <span {...rest} style={{ color, ...style }}>
      {children}
    </span>
  );
};

const StyledTextHeading1 = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 72, lineHeight: "88px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextHeading2 = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 60, lineHeight: "72px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
const StyledTextHeading3 = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 36, lineHeight: "48px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextParagraphHeader = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 24, lineHeight: "32px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextParagraphLarge = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 20, lineHeight: "28px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextParagraphMedium = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 18, lineHeight: "24px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextParagraphSmall = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 16, lineHeight: "20px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextCaption = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{ ...style, fontSize: 13, lineHeight: "16px" }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextSection = ({ style, children, color, ...rest }) => {
  return (
    <StyledText
      color={color}
      style={{
        ...style,
        fontSize: 16,
        lineHeight: "20px",
        fontFamily: "ff-meta-web-pro",
        letterSpacing: "5px",
        textTransform: "uppercase"
      }}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

const StyledTextLink = styled.a`
  color: ${(props) => props.color};
  text-decoration: underline;
`;

export {
  StyledText,
  StyledTextHeading1,
  StyledTextHeading2,
  StyledTextParagraphHeader,
  StyledTextParagraphLarge,
  StyledTextParagraphMedium,
  StyledTextParagraphSmall,
  StyledTextHeading3,
  StyledTextLink,
  StyledTextSection,
  StyledTextCaption
};
