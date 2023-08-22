import { CreateTodo } from './CreateTodo';
interface HeaderProps {
  onAddTodo: (title: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  return (
    <header className='header'>
      <h1>todo</h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
};
