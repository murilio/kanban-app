export enum EType {
  ToDo,
  OnProgress,
  Done,
}

export enum EPriority {
  Low,
  Medium,
  Hight,
  Completed,
}

export type TDataApiOptions = {
  title: string;
  description: string;
  priority: EPriority;
};

export type TDataApi = {
  title: string;
  type: EType;
  options: TDataApiOptions[];
};
