import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F3F5F8;

  :last-child {
    border: none;
  }
`;

const Field = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Field;