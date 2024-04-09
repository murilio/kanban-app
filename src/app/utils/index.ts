import { DraggableLocation } from "@hello-pangea/dnd";

export const getItems = (length: number, offset = 0) => {
  return Array.from({ length: length }, (v, k) => k).map((k) => ({
    id: `0${k + offset}`,
    content: `mock-0${k + offset}`,
  }));
};

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function move<T>(
  source: T[],
  destination: T[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {} as {
    [key: string]: T[];
  };

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}
