import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ini pastikan ada!

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);
  

  const handleAddTask = () => {
    if (input.trim() === '') return;
    const newTask = { text: input, completed: false  };
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true;
  });

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="mb-3">My To-Do List</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="btn btn-secondary"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="card p-4 shadow-sm">
      <div className="row g-2 mb-3">
        <div className="col-9">
          <input 
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
          />
        </div>
        <div className="col-3 d-grid">
          <button 
            onClick={handleAddTask} 
            className="btn btn-success"
          >
            Add
          </button>
        </div>
      </div>


        <div className="btn-group mb-4" role="group">
          <button 
            className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`btn btn-outline-primary ${filter === 'completed' ? 'active' : ''}`} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`btn btn-outline-primary ${filter === 'uncompleted' ? 'active' : ''}`} 
            onClick={() => setFilter('uncompleted')}
          >
            Uncompleted
          </button>
        </div>

        <ul className="list-group">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}
              >
                <div className="form-check">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    checked={task.completed}
                    onChange={() => handleToggleTask(index)}
                    id={`task-${index}`}
                  />
                  <label 
                    className={`form-check-label ms-2 ${task.completed ? 'text-decoration-line-through' : ''}`} 
                    htmlFor={`task-${index}`}
                  >
                    {task.text}
                    {task.deadline && (
                      <div>
                        <small className="text-muted">
                          Deadline: {new Date(task.deadline).toLocaleString()}
                        </small>
                      </div>
                    )}
                  </label>
                </div>

                <button 
                  onClick={() => handleDeleteTask(index)} 
                  className="btn btn-danger btn-sm"
                >
                  ✖
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default App;
