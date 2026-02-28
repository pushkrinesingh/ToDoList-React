import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

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

  function DeleteTask(IdToDelete) {
    setTask(
      task.filter((obj) => {
        return obj.id !== IdToDelete;
      }),
    );
  }

  function EditTask(IdToEdit) {
    const EditedTask = task.find((obj) => {
      return obj.id === IdToEdit;
    });
    setIsEditing(true);
    setEditID(IdToEdit);
    setInput(EditedTask.tasks);
  }

  function CompletedTask(CompletedId) {
    setTask(
      task.map((obj) => {
        return obj.id === CompletedId
          ? { ...obj, Complete: obj.Complete ? false : true }
          : obj;
      }),
    );
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
            <li
              key={obj.id}
              style={
                obj.Complete
                  ? { opacity: 0.5, textDecoration: "line-through" }
                  : { opacity: 1, textDecoration: "none" }
              }
            >
              {obj.tasks}
              <span>
                <MdEdit onClick={() => EditTask(obj.id)} />
                <MdDelete onClick={() => DeleteTask(obj.id)} />
                <FaCheck onClick={() => CompletedTask(obj.id)} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDoList;
