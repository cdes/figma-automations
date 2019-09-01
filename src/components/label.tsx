import * as React from 'react';
import styled from "styled-components";

const Container = styled.label`
padding: 8px;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 15px;
color: #383838;
`;

const Label = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Label;