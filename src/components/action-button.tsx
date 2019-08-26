import * as React from 'react';
import styled from "styled-components";

const Container = styled.button`
  background: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 16px 16px 0;
  border: none;
  flex-shrink: 0;

  :last-child {
    margin-bottom: 16px;
  }
`;

const Button = ({ children, onClick }) => (
  <Container onClick={onClick}>
    {children}
  </Container>
);

export default Button;