import { TDataApi } from "../interfaces/data.interface";
import { api_local } from "./mock";

const KEY_LOCAL = "@kanban-app/murilio";

interface ITodo {
  title: string;
  description: string;
}

const insertInitialLocal = () => {
  const localData = localStorage.getItem(KEY_LOCAL) || "";
  if (!localData) {
    localStorage.setItem(KEY_LOCAL, JSON.stringify(api_local));
  }
};

export const createTodo = ({ title, description }: ITodo) => {
  return new Promise((resolve, reject) => {
    // caso n tenha os dados inicias, é inserido
    insertInitialLocal();

    const localData = localStorage.getItem(KEY_LOCAL) || "";

    try {
      if (localData) {
        const saveData: [any] = JSON.parse(localData);
        saveData.filter(
          (item) =>
            item.type === 0 &&
            item.options.push({
              title,
              description,
              priority: Math.floor(Math.random() * 3),
            })
        );
        localStorage.setItem(KEY_LOCAL, JSON.stringify(saveData));
      }

      return setTimeout(() => {
        resolve(localData);
      }, 2000);
    } catch (error) {
      reject();
      throw new Error("Error ao criar o ToDo");
    }
  });
};

export const listTodos = (type?: number) => {
  return new Promise<TDataApi[]>((resolve, reject) => {
    // caso n tenha os dados inicias, é inserido
    insertInitialLocal();

    const localData = localStorage.getItem(KEY_LOCAL) || "";

    const returnData: [any] = JSON.parse(localData);

    const filterData = returnData[Number(type)] || returnData;

    try {
      return setTimeout(() => {
        resolve(filterData);
      }, 2000);
    } catch (error) {
      reject();
    }
  });
};
