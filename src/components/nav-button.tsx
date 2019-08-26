import * as React from 'react';
import styled from "styled-components";

const Container = styled.button`
  background: #333;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: none;
  color: white;
  font-weight: bold;
  min-width: 40px;
`;

const NavButton = ({ children, onClick }) => (
  <Container onClick={onClick}>
    {children}
  </Container>
);

export default NavButton;