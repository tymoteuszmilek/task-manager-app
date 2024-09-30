import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    const newTaskName = prompt("Enter new task name:", taskToEdit.taskName);
    const newTaskDescription = prompt("Enter new description:", taskToEdit.description);
    const updatedTask = { ...taskToEdit, taskName: newTaskName, description: newTaskDescription };

    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
    setTasks(newTasks);
  };

  const filteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } 
    if (filter === 'non-completed') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyle = {
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: '20px',
    backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    color: isDarkMode ? '#f0f0f0' : '#333',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const taskListStyle = {
    margin: '20px auto',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: isDarkMode ?  '#bbb': '#fff',
    width: '80%',
    transition: 'background-color 0.3s, border-color 0.3s',
  };

  const selectStyle = {
    margin: '10px 5px',
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    margin: '10px 5px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <div style={appStyle}>
      <TaskForm addTask={addTask} isDarkMode={isDarkMode}/>
      <div style={containerStyle}>
      <select onChange={(e) => setFilter(e.target.value)} value={filter} style={selectStyle}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="non-completed">Non-Completed Tasks</option>
      </select>
      <button onClick={toggleDarkMode} style={buttonStyle}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      </div>
      <div style={taskListStyle}>
        <TaskList 
          tasks={filteredTasks()} 
          deleteTask={deleteTask}
          editTask={editTask}
          toggleTaskCompletion={toggleTaskCompletion} 
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default App;
