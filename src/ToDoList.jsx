import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ToDoList = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [IsEditing, setIsEditing] = useState(false);
  const [EditID, setEditID] = useState(null);

  function AddTask() {
    if (!IsEditing) {
      const obj = { id: Date.now(), tasks: input };
      setTask([...task, obj]);
    } else {
      setTask(
        task.map((obj) => {
          return obj.id === EditID ? { ...obj, tasks: input } : obj;
        }),
      );
    }
    setIsEditing(false);
    setEditID(null);
    setInput("");
  }

  function DeleteTask(id) {
    setTask(
      task.filter((obj) => {
        return obj.id !== id;
      }),
    );
  }

  function EditTask(id) {
    const EditedTask = task.find((obj) => {
      return obj.id === id;
    });
    setIsEditing(true);
    setEditID(id);
    setInput(EditedTask.tasks);
  }

  return (
    <>
      <div className="wrapper">
        <h1>To Do List</h1>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter Your Task"
        />
        <button onClick={AddTask}>
          {!IsEditing ? "Add Task" : "Edit task"}
        </button>
      </div>
      <ul>
        {task.map((obj) => {
          return (
            <li>
              {obj.tasks}
              <span>
                <MdEdit onClick={() => EditTask(obj.id)} />
                <MdDelete onClick={() => DeleteTask(obj.id)} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDoList;
