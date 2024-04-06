"use client"

import { DragDropContext, Draggable, DraggableLocation, DropResult, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

const getItems = (length: number, offset = 0) => {
  return Array.from({ length: length }, (v, k) => k).map(k => ({
    id: `0${k + offset}`,
    content: `mock-0${k + offset}`
  }));
}

const reorder = <T extends unknown>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


function move<T>(source: T[], destination: T[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {} as {
    [key: string]: T[]
  };

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Home() {
  const [state, setState] = useState([getItems(10), getItems(1, 10)])

  function onDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) return;

    const sourceId = +source.droppableId
    const destinationId = +destination.droppableId

    if (sourceId === destinationId) {
      const items = reorder(state[sourceId], source.index, destination.index);
      const newState = [...state];
      newState[sourceId] = items;
      setState(newState);
    } else {
      const result = move(state[sourceId], state[destinationId], source, destination);
      const newState = [...state];
      newState[sourceId] = result[sourceId];
      newState[destinationId] = result[destinationId];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className='flex gap-10'>
        {state.map((item, i) => (
          <div key={i} className='w-3/12'>
            <Droppable droppableId={i + ''}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{ backgroundColor: snapshot.isDraggingOver ? '#f0a345' : '#ddd' }}
                  {...provided.droppableProps}
                  className='p-10'
                >
                  {item.map((ch, iCh) => (
                    <div key={ch.id}>
                      <Draggable draggableId={ch.id} index={iCh}>
                        {(provided, snapshot) => {
                          console.log('@@@@@@', provided.dragHandleProps)
                          const styleDragging = {
                            backgroundColor: 'blue',
                            transform: 'rotate(45deg)!important',
                            ...provided.draggableProps.style,
                          }

                          return (
                            <div
                              ref={provided.innerRef}
                              className='p-2'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={snapshot.isDragging ? styleDragging : { ...provided.draggableProps.style }}
                            >
                              <h4>{ch.content}</h4>
                            </div>
                          )
                        }}
                      </Draggable>
                    </div>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </section>
    </DragDropContext>
  );
}
