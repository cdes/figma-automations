import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
  background: #F3F5F8;
  padding: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #383838;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 8px 8px;
`;

const Footer = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Footer;