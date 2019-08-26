import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  max-height: 100%;
`;

const App = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default App;