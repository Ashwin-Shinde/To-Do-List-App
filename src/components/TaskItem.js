import React, { useState } from 'react';

const TaskItem = ({ task, index, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    updateTask(index, { name: title, description, date: dueDate, priority, isDone: task.isDone });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.isDone ? 'done' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <p>Date: {task.date}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.isDone ? 'Done' : 'Pending'}</p>
          <button onClick={() => updateTask(index, { ...task, isDone: !task.isDone })}>
            {task.isDone ? 'Mark as Pending' : 'Mark as Done'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(index)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
