import * as React from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

interface ContainerProps {
  readonly isDragging: boolean;
};

const Container = styled.div<ContainerProps>`
  margin: 16px 16px 0;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1), 0px 1px 2px #A0AEC0;
  border-radius: 8px;
  position: relative;

  /* :after {
    content: "";
    width: 2px;
    height: 16px;
    background: #ddd;
    position: absolute;
    bottom: -17px;
    left: calc(50% - 1px);
    display: ${props => props.isDragging ? 'none' : 'block'}
  }

  :last-child:after {
    display: none;
  } */
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
    {(provided, snapshot) => (
      <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
        <Title>Random Number</Title>
        {children}
      </Container>
    )}
  </Draggable>
);

export default Action;