const Todo = require('../models/Todo');

const todoController = {
  // GET all todos
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find({}).sort({ createdAt: -1 });
      console.log(`📋 Found ${todos.length} todos`);
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  // CREATE new todo
  createTodo: async (req, res) => {
    try {
      const { title, completed = false } = req.body;
      
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }
      
      const newTodo = new Todo({
        title: title.trim(),
        completed: Boolean(completed)
      });
      
      const savedTodo = await newTodo.save();
      console.log(`✅ Created todo: ${savedTodo.title}`);
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  // UPDATE todo
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      
      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (completed !== undefined) updateData.completed = Boolean(completed);
      updateData.updatedAt = new Date();
      
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      console.log(`🔄 Updated todo: ${updatedTodo.title}`);
      res.json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  // DELETE todo
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedTodo = await Todo.findByIdAndDelete(id);
      
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      console.log(`🗑️ Deleted todo: ${deletedTodo.title}`);
      res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
};

module.exports = todoController;