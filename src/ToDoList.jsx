import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ToDoList = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [isEditing, setEditing] = useState(false);

  function AddTask() {
    const obj = { id: Date.now(), tasks: input };

    setTask([...task, obj]);
    setInput("");
  }
  function DeleteTask(id) {
    setTask(task.filter((obj) => obj.id !== id));
  }

  function EditTask(id) {
    const EditedTask = task.find((obj) => obj.id == id);
    setInput(EditedTask.tasks);
    setEditing(true);
  }

  return (
    <>
      <div className="wrapper">
        <h1>To Do List</h1>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter The Task"
        />
        <button onClick={AddTask}>
          {isEditing ? "Edit Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {task.map((obj) => {
          return (
            <li>
              <span>{obj.tasks}</span>
              <MdDelete onClick={() => DeleteTask(obj.id)} />
              <MdEdit onClick={() => EditTask(obj.id)} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDoList;
