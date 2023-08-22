import { useState } from 'react';

interface CreateTodoProps {
  saveTodo: (title: string) => void;
}
export const CreateTodo: React.FC<CreateTodoProps> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='new-todo'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Add to do'
        autoFocus
      />
    </form>
  );
};
