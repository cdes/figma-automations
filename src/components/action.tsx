import * as React from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px 16px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1), 0px 1px 2px #A0AEC0;
  border-radius: 8px;

  :last-child {
    margin-bottom: 24px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  background: #F3F5F8;
  border-radius: 8px 8px 0 0;
  height: 24px;
  color: #383838;
  font-weight: bold;
  padding: 0 8px;
  font-size: 11px;
`;

const Action = ({ children, index, draggableId }) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided) => (
      <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <Title>Random Number</Title>
        {children}
      </Container>
    )}
  </Draggable>
);

export default Action;