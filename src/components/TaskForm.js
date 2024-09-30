import { useState } from 'react';

function TaskForm({ addTask, isDarkMode }){
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
        width: '50%'
    };

    const buttonStyle = {
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: isHovered ? '#0056b3' : '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
        color: isDarkMode ? 'white' : 'black'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName) {
            addTask({ taskName, description });
            setTaskName('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input  
                style={inputStyle}
                type='text'
                placeholder='Enter task'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                />
            <input 
                style={inputStyle}
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)
                }
                />
            <button type='submit' 
                style = {buttonStyle}
                onMouseEnter = {() => setIsHovered(true)}
                onMouseLeave = {() => setIsHovered(false)}
            >Add Task</button>
        </form>
    )
}

export default TaskForm;