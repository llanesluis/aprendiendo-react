import { useContext } from 'react';
import { TodoContext } from '../context/todo';

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw Error('useTodo debe ser usado dentro de un provider');
  }
  return context;
};
