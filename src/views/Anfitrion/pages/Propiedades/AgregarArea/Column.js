import React from "react";
import styled from "styled-components";
import Area from "./Area";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;
const Title = styled.h3``;
const AreasList = styled.div`
  padding: 8px;
`;

export default function Column(props) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <AreasList ref={provided.innerRef} {...provided.droppableProps}>
            {props.areas.map((area, index) => (
              <Area key={area.id} area={area} index={index} />
            ))}

            {provided.placeholder}
          </AreasList>
        )}
      </Droppable>
    </Container>
  );
}
