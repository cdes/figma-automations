import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  height: 24px;
  background: ${props => props.color};
  box-shadow: 0px 1px 2px rgba(66,82,107,0.22);
  border-radius: 99px;
  padding: 0 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 24px;
  color: rgba(255,255,255,.8);
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Output = ({ children, color }) => (
  <Container color={color}>
    {children}
  </Container>
);

export default Output;