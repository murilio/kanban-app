"use client"

import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { CSSProperties, useState } from 'react';
import { EType } from './interfaces/data.interface';
import { APIMOCK } from './mock/api.mock';
import { move, reorder } from './utils';

export default function Home() {
  const [state, setState] = useState(APIMOCK)

  function onDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) return;

    const sourceId = +source.droppableId
    const destinationId = +destination.droppableId

    if (sourceId === destinationId) {
      const items = reorder(state[sourceId].options, source.index, destination.index);

      const newState = [...state];
      newState[sourceId].options = items;
      setState(newState);
    } else {
      const result = move(state[sourceId].options, state[destinationId].options, source, destination);

      const newState = [...state];
      newState[sourceId].options = result[sourceId];
      newState[destinationId].options = result[destinationId];

      setState(newState);
    }
  }

  return (
    <section className='flex gap-2'>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((item, i) => {
          const colors = {
            [EType.ToDo]: 'border-violet-500',
            [EType.OnProgress]: 'border-orange-500',
            [EType.Done]: 'border-green-500',
          }

          return (
            <section key={i} className='w-1/3 bg-slate-100 rounded-md'>
              <h3 className={`py-4 mx-4 border-b-2 ${colors[item.type]}`}>
                {item.title} <span className='text-xs w-2 h-2 bg-slate-300 px-2 py-1 rounded-full'>{item.options.length}</span>
              </h3>
              <Droppable droppableId={i + ''} key={i}>
                {(provided, snapshot) => {
                  const styleDefault = 'border-dashed border-2 border-slate-100 m-4 min-h-80 w-auto'
                  const styleDraggingOver = 'bg-violet-100 border-dashed border-violet-400 border-2 rounded m-4 min-h-80 w-auto'

                  return (
                    <div
                      ref={provided.innerRef}
                      className={snapshot.isDraggingOver ? styleDraggingOver : styleDefault}
                      {...provided.droppableProps}
                    >
                      {item.options.map((ch, iCh) => (
                        <Draggable draggableId={`${i}${iCh}`} index={iCh} key={`${i}${iCh}`}>
                          {(provided, snapshot) => {
                            const transform = `${provided.draggableProps.style?.transform} rotate(10deg)`

                            const styleDragging: CSSProperties = {
                              backgroundColor: 'red',
                              ...provided.draggableProps.style,
                              transition: 'all 0.1s',
                              transform,
                            }

                            const defaultStyle: CSSProperties = {
                              ...provided.draggableProps.style
                            }

                            return (
                              <div
                                ref={provided.innerRef}
                                className='p-4'
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={snapshot.isDragging ? styleDragging : defaultStyle}
                              >
                                <h4>{ch.title}</h4>
                              </div>
                            )
                          }}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </section>
          )
        })}
      </DragDropContext>
    </section>
  );
}
