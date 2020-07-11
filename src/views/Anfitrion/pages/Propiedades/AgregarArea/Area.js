import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
`;

function Area(props) {
  
  return (
    <Draggable draggableId={props.area.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.area.name}
        </Container>
      )}
    </Draggable>
  );
}

export default Area;
