"use client"

import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { CSSProperties, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HeaderPage } from './components/HeaderPage';
import { Modal } from './components/Modal';
import { useModal } from './context/ModalContext';
import { EPriority, EType, TDataApi } from './interfaces/data.interface';
import { createTodo, listTodos } from './service/api';
import { initialData } from './service/data';
import { move, reorder } from './utils';

type Inputs = {
  title: string
  description: string
}

export default function Home() {
  const [state, setState] = useState<TDataApi[]>(initialData)
  const { isModalOpen, handleModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ title, description }) => {
    await createTodo({ title, description })
    handleModal()
  }

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

  useEffect(() => {
    (async () => {
      const data = await listTodos()
      setState(data)
    })()
  }, [])

  return (
    <>
      <HeaderPage onClick={handleModal} />

      <Modal isOpen={isModalOpen} onClose={handleModal}>
        <h3 className='mb-4 '>Create To Do</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <input className={`bg-zinc-100 text-sm outline-none px-3 min-h-10 my-1 rounded w-full ${errors.title && 'border-red-500'}`} placeholder='Insert card title' {...register("title", { required: true })} />
          {errors.title && <span className='border border-red-500 bg-red-100 px-1 rounded text-xs mb-4 text-zinc-700'>Title is required</span>}

          <textarea rows={5} className={`bg-zinc-100 text-sm outline-none p-3 min-h-30 h-full my-1 rounded w-[400px] ${errors.description && 'border-red-500'}`} placeholder='Insert card description' {...register("description", { required: true })} >
          </textarea>
          {errors.description && <span className='border border-red-500 bg-red-100 px-1 rounded text-xs mb-4 text-zinc-700'>Description is required</span>}

          <button type="submit" className='rounded-md bg-orange-200 mt-4 min-h-10'>
            {isSubmitting ? 'Loading...' : 'Create'}
          </button>
        </form>
      </Modal>

      <section className='flex gap-2 h-full'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((item, i) => {
            const colors = {
              [EType.ToDo]: 'border-violet-500',
              [EType.OnProgress]: 'border-orange-500',
              [EType.Done]: 'border-green-500',
            }

            return (
              <section key={i} className='flex flex-col w-1/3 bg-slate-100 rounded-md'>
                <h3 className={`py-4 mx-4 border-b-2 ${colors[item.type]}`}>
                  {item.title} <span className='text-xs w-2 h-2 bg-slate-300 px-2 py-1 rounded-full'>{item.options.length}</span>
                </h3>
                <Droppable droppableId={i + ''} key={i}>
                  {(provided, snapshot) => {
                    const styleDraggingOver = 'bg-violet-100 border-dashed border-violet-400 border rounded m-4'

                    return (
                      <div
                        ref={provided.innerRef}
                        className={`border-dashed border border-slate-100 m-4 h-full w-auto flex flex-col gap-4 ${snapshot.isDraggingOver ? styleDraggingOver : ''}`}
                        {...provided.droppableProps}
                      >
                        {item.options.map((ch, iCh) => (
                          <Draggable draggableId={`${i}${iCh}`} index={iCh} key={`${i}${iCh}`}>
                            {(provided, snapshot) => {
                              const transform = `${provided.draggableProps.style?.transform} rotate(10deg)`

                              const styleDragging: CSSProperties = {
                                ...provided.draggableProps.style,
                                transition: 'all 0.1s',
                                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                                transform,
                              }

                              const defaultStyle: CSSProperties = {
                                ...provided.draggableProps.style
                              }

                              const colors = {
                                [EPriority.Low]: 'bg-sky-100 text-sky-600',
                                [EPriority.Medium]: 'bg-orange-100 text-orange-600',
                                [EPriority.Hight]: 'bg-red-100 text-red-600',
                                [EPriority.Completed]: 'bg-emerald-100 text-emerald-600',
                              }

                              return (
                                <div
                                  ref={provided.innerRef}
                                  className='flex flex-col gap-2 p-4 rounded bg-white'
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={snapshot.isDragging ? styleDragging : defaultStyle}
                                >
                                  <span className={`text-xs rounded p-1 w-fit ${colors[ch.priority]}`}>{EPriority[ch.priority]}</span>
                                  <h4 className='text-lg'>{ch.title}</h4>
                                  <p className='text-xs text-zinc-500'>{ch.description}</p>
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

    </>
  );
}
