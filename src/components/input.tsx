import * as React from 'react';
import styled from "styled-components";

const Container = styled.input`
  width: 128px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 2px;
  line-height: 32px;
  padding: 0 8px;

  ::placeholder {
    color: #BABABA;
  }
`;

const Input = (props) => (
  <Container {...props} />
);

export default Input;