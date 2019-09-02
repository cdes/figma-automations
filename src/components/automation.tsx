import * as React from 'react';
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 304px;
  height: calc(100% - 40px);
  overflow-y: scroll;
  margin-top: 40px;
  min-height: calc(100% - 40px);
  padding: 0 0 16px;
  box-sizing: border-box;
`;

const Automation = ({ children }) => {
  if(children.length === 0) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center", color: "#999" }}>
        Add actions from the right 👉🏼
      </Container>
    );
  }
  else {
    return (
      <Droppable droppableId="automation">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  }
};

export default Automation;