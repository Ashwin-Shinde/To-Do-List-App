import React, { useState, useEffect } from 'react';

function TaskForm({ tasks, setTasks, editTaskId, setEditTaskId }) {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      if (taskToEdit) {
        setTaskName(taskToEdit.name);
        setTaskDesc(taskToEdit.description);
        setTaskDate(taskToEdit.date);
        setTaskPriority(taskToEdit.priority);
      }
    }
  }, [editTaskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      const newTask = {
        id: editTaskId ? editTaskId : Date.now(),
        name: taskName,
        description: taskDesc,
        date: taskDate,
        priority: taskPriority,
        isDone: false,
      };
  
      const updatedTasks = editTaskId
        ? tasks.map((task) => (task.id === editTaskId ? newTask : task))
        : [...tasks, newTask];
  
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
      // Reset form
      setTaskName('');
      setTaskDesc('');
      setTaskDate('');
      setTaskPriority('Low');
      setEditTaskId(null);
    }
  };
  

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editTaskId ? 'Edit Task' : 'To-Do App'}</h2>

      <label htmlFor="taskName">Task Name:</label>
      <input
        type="text"
        id="taskName"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />

      <label htmlFor="taskDesc">Task Description:</label>
      <textarea
        id="taskDesc"
        placeholder="Task Description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        required
      />

      <label htmlFor="taskDate">Date & Time:</label>
      <input
        type="datetime-local"
        id="taskDate"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        required
      />

      <label htmlFor="taskPriority">Priority:</label>
      <select
        id="taskPriority"
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" className="task-form-button">
        {editTaskId ? 'Save Changes' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
