import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import TodoFilter from '../components/TodoFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    const data = await api.getTodos();
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async (todo) => {
    const newTodo = await api.createTodo(todo);
    if (newTodo) {
      setTodos([...todos, newTodo]);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    const updated = await api.updateTodo(id, updatedTodo);
    if (updated) {
      setTodos(todos.map(todo => todo.id === id ? updated : todo));
    }
  };

  const deleteTodo = async (id) => {
    const success = await api.deleteTodo(id);
    if (success) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">
            {totalCount === 0 
              ? 'No todos yet. Add one below!' 
              : `${completedCount} of ${totalCount} completed`
            }
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <AddTodo onAdd={addTodo} />
          
          {todos.length > 0 && (
            <>
              <TodoFilter filter={filter} onFilterChange={setFilter} />
              
              <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {filter === 'active' && 'No active todos'}
                    {filter === 'completed' && 'No completed todos'}
                    {filter === 'all' && 'No todos found'}
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React and Node.js</p>
        </footer>
      </div>
    </div>
  );
};

export default TodoApp;

