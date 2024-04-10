import { EType, TDataApi } from "../interfaces/data.interface";

export const api_local: TDataApi[] = [
  {
    title: "To Do",
    type: EType.ToDo,
    options: [],
  },
  {
    title: "On Progress",
    type: EType.OnProgress,
    options: [],
  },
  {
    title: "Done",
    type: EType.Done,
    options: [],
  },
];
