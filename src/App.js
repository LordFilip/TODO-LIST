import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  return <TodoList />;
}

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  function handleAdd() {
    if (task) {
      const newTask = { id: uuidv4(), text: task, finished: false };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleClose(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleCheck(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, finished: !task.finished } : task
    );
    setTasks(updatedTasks);
  }

  function handleEdit(id, newText) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.finished)
      : filter === "incomplete"
      ? tasks.filter((task) => !task.finished)
      : tasks;

  return (
    <div className="app">
      <div className="header">
        <h1>YOUR TODO LIST</h1>
        <h3>Let's organize your day</h3>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What is your task?"
        />
        <button onClick={handleAdd}>Add</button>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleClose={handleClose}
            handleCheck={handleCheck}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

function Task({ task, handleClose, handleCheck, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    setNewText(e.target.value);
  }

  function handleUpdate() {
    handleEdit(task.id, newText);
    toggleEditing();
  }

  return (
    <li className={task.finished ? "green" : "red"}>
      <div className="li-left">
        {isEditing ? (
          <input
            type="text"
            style={{ width: "100%" }}
            value={newText}
            onChange={handleInputChange}
          />
        ) : (
          <p>{task.text}</p>
        )}
      </div>
      <div className="li-right">
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <>
            <button onClick={() => handleClose(task.id)}>Close</button>{" "}
            <button onClick={toggleEditing}>Edit</button>
            <input
              type="checkbox"
              checked={task.finished}
              onChange={() => handleCheck(task.id)}
            />
          </>
        )}
      </div>
    </li>
  );
}
