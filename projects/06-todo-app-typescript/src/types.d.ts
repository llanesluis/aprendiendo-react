import { TODO_FILTERS } from './consts';
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export type TodoId = Pick<Todo, 'id'>; //Esto sirve cuando se trata de proteger el cambio de contrato
export type ListOfTodos = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
