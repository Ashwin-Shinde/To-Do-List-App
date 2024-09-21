import React from 'react';

function TaskList({ tasks, setTasks, setEditTaskId }) {
  const markAsDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (id) => {
    setEditTaskId(id);
  };

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-details">
              <h3>{task.name}</h3>
              <p><strong>Description: </strong> {task.description}</p>
              <p><strong>Date: </strong> {task.date}</p>
              <p><strong>Priority: </strong> {task.priority}</p>
              <p><strong>Status: </strong> {task.isDone ? 'Done' : 'Pending'}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => markAsDone(task.id)}>
                {task.isDone ? 'Mark as Pending' : 'Mark as Done'}
              </button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
