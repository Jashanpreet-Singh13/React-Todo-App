import { useState } from "react";
import styles from "./TodoInput.module.css";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    addTodo(task);
    setTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.todoInput}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}