import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className="empty-message">No todos yet. Add one to get started!</p>;
  }

  // Separate active and completed todos
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-lists-container">
      {/* Active todos section */}
      <div className="todo-section">
        {activeTodos.length > 0 ? (
          <ul className="todo-list">
            {activeTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={onToggle} 
                onDelete={onDelete} 
              />
            ))}
          </ul>
        ) : (
          <p className="empty-message">No active todos. Add one to get started!</p>
        )}
      </div>

      {/* Completed todos section */}
      {completedTodos.length > 0 && (
        <div className="todo-section completed-section">
          <h2 className="section-title">Completed</h2>
          <ul className="todo-list">
            {completedTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={onToggle} 
                onDelete={onDelete} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
