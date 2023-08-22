import { type ListOfTodos } from '../types';
import { Todo } from './Todo';

interface TodosProps {
  todos: ListOfTodos;
  onRemoveTodo: (id: string) => void;
  onCompleteTodo: (id: string) => void;
}

export const Todos: React.FC<TodosProps> = ({
  todos,
  onRemoveTodo,
  onCompleteTodo,
}) => {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onCompleteTodo={() => onCompleteTodo(todo.id)}
            onRemoveTodo={() => onRemoveTodo(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
};
