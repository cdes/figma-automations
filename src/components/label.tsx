import * as React from 'react';
import styled from "styled-components";

const Container = styled.label`
  font-size: 12px;
  color: #383838;
`;

const Label = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Label;