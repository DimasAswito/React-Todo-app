import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() === '') return;
    const newTask = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="input-group">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggleTask(index)}
            />
            <span>{task.text}</span>
            <button onClick={() => handleDeleteTask(index)} className="delete-btn">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
