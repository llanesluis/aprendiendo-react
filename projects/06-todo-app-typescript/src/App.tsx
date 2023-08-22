import { useState } from 'react';
import { Todos } from './components/Todos';
import { TODO_FILTERS } from './consts';
import { FilterValue, Todo } from './types';
import { Footer } from './components/Footer';
import { useTodo } from './hooks/useTodo';
import { Header } from './components/Header';

const App = () => {
  const {
    todos,
    handleAddTodo,
    handleRemove,
    handleComplete,
    handleClearCompleted,
  } = useTodo();

  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  //FILTER_TODOS
  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo: Todo) => !todo.completed).length;

  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />

      <Todos
        onRemoveTodo={handleRemove}
        onCompleteTodo={handleComplete}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleClearCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;

// const [todos, setTodos] = useState(mockTodos);
// //ADD_TODO
// const handleAddTodo = (title: string) => {
//   const newTodo = { id: crypto.randomUUID(), title, completed: false };
//   setTodos((prev) => [...prev, newTodo]);
// };
// //REMOVE_TODO
// const handleRemove = (id: string) => {
//   const newTodos = todos.filter((todo) => todo.id !== id);
//   setTodos(newTodos);
// };
// //TOGGLE_TODO
// const handleComplete = (id: string) => {
//   const newTodos = todos.map((todo) => {
//     return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
//   });
//   setTodos(newTodos);
// };

// //CLEAR_COMPLETED_TODOS
// const handleClearCompleted = () => {
//   const newTodos = todos.filter((todo) => !todo.completed);
//   setTodos(newTodos);
// };
