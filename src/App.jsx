import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import styles from "./App.module.css";

export default function App() {

   const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    document.title = `Todo App(${todos.length})`;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState("all");

  const addTodo = (task) => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    console.log("Todo added");
  };

   const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if(filter == "completed") return todo.completed;
    if(filter == "incomplete") return !todo.completed;
    return true;
  })

  return (
    <div className={styles.container}>
      <h1>📝 Todo App</h1>
      <TodoInput addTodo={addTodo} />

      <div className={styles.filterDropdown}>
        <label htmlFor="filter">Filter Todos: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} editTodo={editTodo} />
    </div>
  );

}