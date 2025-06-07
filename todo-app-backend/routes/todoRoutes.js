// C:\Users\dnyan\Desktop\my-app\todo-app-backend\routes\todoRoutes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController'); // Adjust path if controller is in a different folder

// GET all todos
router.get('/', todoController.getAllTodos);

// POST a new todo
router.post('/', todoController.createTodo);

// PUT (update) a todo by ID
router.put('/:id', todoController.updateTodo);

// DELETE a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;