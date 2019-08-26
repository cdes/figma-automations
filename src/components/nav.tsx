import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 304px;
  position: fixed;
  top: 0;
  left: 0;
`;

const Nav = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Nav;