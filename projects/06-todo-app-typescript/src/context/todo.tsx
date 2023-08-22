import { createContext, useReducer } from 'react';
import { todoReducer } from '../reducer/todoReducer';
import { FilterValue, ListOfTodos } from '../types';
import { initialState } from '../reducer/todoReducer';

export const TodoContext = createContext<values | undefined>(undefined);

const useTodoReducer = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  //ADD_TODO
  const handleAddTodo = (title: string) => {
    dispatch({ type: 'ADD_TODO', payload: { title } });
  };

  //REMOVE_TODO
  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_TODO', payload: { id } });
  };
  //TOGGLE_TODO
  const handleComplete = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  //FILTER_TODOS
  const handleFilterChange = (filter: FilterValue) => {
    dispatch({ type: 'FILTER_TODOS', payload: { filter } });
  };

  //CLEAR_COMPLETED_TODOS
  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED_TODOS' });
  };

  return {
    todos,
    handleAddTodo,
    handleRemove,
    handleComplete,
    handleFilterChange,
    handleClearCompleted,
  };
};

export interface values {
  todos: ListOfTodos;
  handleAddTodo: (title: string) => void;
  handleRemove: (id: string) => void;
  handleComplete: (id: string) => void;
  // handleFilterChange?: (filter: FilterValue) => void;
  handleClearCompleted: () => void;
}
interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const {
    todos,
    handleAddTodo,
    handleRemove,
    handleComplete,
    // handleFilterChange,
    handleClearCompleted,
  } = useTodoReducer();

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleRemove,
        handleComplete,
        // handleFilterChange,
        handleClearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
