import { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

export default function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  editTodo,
}) {
  const [visibleTodos, setVisibleTodos] = useState(todos.slice(0, 5));

  useEffect(() => {
    setVisibleTodos(todos.slice(0, 5));
  }, [todos]);

 const handleScroll = (e) => {
   const { scrollTop, scrollHeight, clientHeight } = e.target;

   if (scrollHeight - scrollTop <= clientHeight + 1) {
     if (visibleTodos.length < todos.length) {
       setVisibleTodos((prev) => [
         ...prev,
         ...todos.slice(prev.length, prev.length + 5),  
       ]);
     }
   }
 };


  return (
    <div className={styles.box} onScroll={handleScroll}>
      <ul className={styles.todoList}>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}
