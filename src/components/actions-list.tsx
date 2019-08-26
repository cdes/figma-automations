import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  width: 200px;
  height: 100%;
  min-height: 100%;
`;

const ActionsList = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default ActionsList;