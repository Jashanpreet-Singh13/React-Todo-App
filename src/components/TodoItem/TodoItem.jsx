import { useState } from "react";
import styles from "./TodoItem.module.css";

export default function TodoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSaveEdit = () => {
    if(newText.trim() === "") {
      setNewText(todo.text);
    } else {
      editTodo(todo.id, newText);
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if(isEditing) {
      handleSaveEdit();
    } else {
      setIsEditing(true);
    }
  }

  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />

      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSaveEdit}
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <button onClick={() => handleEditClick(true)}>✏️</button>
      <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
    </li>
  );
}
