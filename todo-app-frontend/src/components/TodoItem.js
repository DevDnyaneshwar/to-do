import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { ...todo, title: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(todo.id, { ...todo, completed: !todo.completed });
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
        >
          <Check size={18} />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <span
        className={`flex-1 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;