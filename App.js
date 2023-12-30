import React, { useState } from "react";
import "./App.css";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };

      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = () => {
    if (updatedTask !== "") {
      const updatedTasks = tasks.map((task) => {
        if (task.id === updateTaskId) {
          return {
            ...task,
            title: updatedTask,
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setUpdateTaskId(null);
      setUpdatedTask("");
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="todo-wrapper">
      <div className="todo-input">
        <div className="todo-input-item">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      <div className="todo-list">
        <div className="item-container">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {updateTaskId === task.id ? (
                  <>
                   <input
      type="text"
      value={updatedTask}
      onChange={(e) => setUpdatedTask(e.target.value)}
       
    />
                    <button
                    className="update-button"  onClick={handleUpdateTask}
                    >Update</button> 
  </>
                ) : (
                  <>
                   
                    <span className={task.completed ? "completed" : ""}>
                      {task.title}
                    </span>
                    <TiDeleteOutline
                      className="icon" onClick={() => handleDeleteTask(task.id)}title="Delete"/>
                    
              
                    <CiEdit
                      className="edit-icon"
                      onClick={() => {
                        setUpdateTaskId(task.id);
                        setUpdatedTask(task.title);
                      }}title="Update"
                    />
                     
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      </div>
  );
}

export default App;