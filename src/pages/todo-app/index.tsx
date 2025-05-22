import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoInput, TodoList, Todo } from '../../components/todos';
import styles from './TodoApp.module.css';

// Fixed: Using the same key for both loading and saving
const STORAGE_KEY = 'windsurf-todos';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Windsurf Todo App</h1>
      <div className={styles.todoApp}>
        <TodoInput onAddTodo={addTodo} />
        <TodoList
        todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
