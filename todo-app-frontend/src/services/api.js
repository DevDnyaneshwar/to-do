// Updated api.js with environment-based API URL
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  getTodos: async () => {
    try {
      const response = await fetch(`${API_BASE}/todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  },
  
  createTodo: async (todo) => {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      return null;
    }
  },
  
  updateTodo: async (id, todo) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      return null;
    }
  },
  
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  }
};
