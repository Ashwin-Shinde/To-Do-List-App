import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState('All');

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        console.log('Loaded tasks from localStorage:', savedTasks);
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error parsing tasks from local storage:', error);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to local storage whenever tasks are updated, only if there are tasks
  useEffect(() => {
    if (tasks.length > 0) {
      console.log('Saving tasks to localStorage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Done') return task.isDone;
    if (task.isDone) return false;
    return task.priority === filter;
  });

  return (
    <div className="app-container">
      <div className="header">
        <DarkModeToggle />
      </div>
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editTaskId={editTaskId}
        setEditTaskId={setEditTaskId}
      />
      <div className="filter-buttons">
        {['All', 'High', 'Medium', 'Low', 'Done'].map((status) => (
          <button key={status} onClick={() => setFilter(status)}>
            {status}
          </button>
        ))}
      </div>
      <TaskList
        tasks={filteredTasks}
        setTasks={setTasks}
        setEditTaskId={setEditTaskId}
      />
    </div>
  );
}

export default App;
