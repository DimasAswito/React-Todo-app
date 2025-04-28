import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks dari LocalStorage saat pertama kali render
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse tasks from LocalStorage:', e);
      }
    }
  }, []);

  // Simpan tasks ke LocalStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={task.completed ? 'completed' : ''}
            >
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => handleToggleTask(index)}
              />
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(index)} className="delete-btn">
                ✖
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
