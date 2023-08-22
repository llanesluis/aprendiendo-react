import { Todo as ITodo } from '../types';

interface TodoProps extends ITodo {
  onRemoveTodo: () => void;
  onCompleteTodo: () => void;
}

export const Todo: React.FC<TodoProps> = ({
  title,
  completed,
  onRemoveTodo,
  onCompleteTodo,
}) => {
  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={onCompleteTodo}
      />
      <label>{title}</label>
      <button className='destroy' onClick={onRemoveTodo}></button>
    </div>
  );
};
