import * as React from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  background: #eee;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 16px 16px 0;
  flex-shrink: 0;

  :last-child {
    margin-bottom: 16px;
  }
`;

const Action = ({ children, actionId, index }) => (
  <Draggable draggableId={`${actionId}-${index}`} index={index}>
    {(provided) => (
      <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        {children}
      </Container>
    )}
  </Draggable>
);

export default Action;