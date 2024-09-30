import { useState } from 'react';

function TaskList({ tasks, deleteTask, editTask, toggleTaskCompletion, isDarkMode }) {
    const [editHoverStates, setEditHoverStates] = useState(Array(tasks.length).fill(false));
    const [deleteHoverStates, setDeleteHoverStates] = useState(Array(tasks.length).fill(false));

    const listStyle = {
        margin: '20px auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: isDarkMode ? '#494949' : '#f9f9f9',
        width: '80%',
        position: 'relative',
        
    };

    const taskItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        borderBottom: '2px solid #bbb',
        position: 'relative',
    };

    const titleContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const titleStyle = {
        textDecoration: 'none',
        color: isDarkMode ? 'white' : '#333',
        margin: '0',
        padding: '0',
        flex: 1,
    };

    const completedTitleStyle = {
        ...titleStyle,
        textDecoration: 'line-through',
        color: 'gray',
    };

    const descriptionStyle = {
        margin: '5px 0',
        color: isDarkMode ? '#ccc': '#666',
        fontSize: '14px',
    };

    const borderStyle = {
        borderBottom: '1px solid #eee',
        marginBottom: '5px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    };

    const buttonStyle = (isHovered) => ({
        marginLeft: '5px',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '3px',
        backgroundColor: isHovered ? '#0056b3' : '#007bff',
        color: 'white',
        cursor: 'pointer',
    });

    const circleStyle = (completed) => ({
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: completed ? '2px solid #007bff' : '2px solid #888',
        backgroundColor: completed ? '#007bff' : 'transparent',
        cursor: 'pointer',
        marginRight: '10px',
        boxShadow: completed ? 'inset 0 0 0 2px white' : 'none',
    });

    const xButtonStyle = (isHovered) => ({
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        borderRadius: '50%',
        backgroundColor: isHovered ? '#d9534f' : '#f44336',
        color: 'white',
        cursor: 'pointer',
        width: '18px',
        height: '18px',
    });

    return (
        <div style={listStyle}>
            {tasks.map((task, index) => (
                <div key={index} style={taskItemStyle}>
                    <button 
                        style={xButtonStyle(deleteHoverStates[index])} 
                        onClick={() => deleteTask(index)} 
                        onMouseEnter={() => {
                            const newStates = [...deleteHoverStates];
                            newStates[index] = true;
                            setDeleteHoverStates(newStates);
                        }} 
                        onMouseLeave={() => {
                            const newStates = [...deleteHoverStates];
                            newStates[index] = false;
                            setDeleteHoverStates(newStates);
                        }}
                    >
                        {deleteHoverStates[index] ? '×' : ''}
                    </button>
                    <div style={titleContainerStyle}>
                        <div 
                            style={circleStyle(task.completed)} 
                            onClick={() => toggleTaskCompletion(index)}
                        ></div>
                        <h2 style={task.completed ? completedTitleStyle : titleStyle}>
                            {task.taskName}
                        </h2>
                    </div>
                    <div style={borderStyle}></div>
                    <h4 style={descriptionStyle}>{task.description}</h4>
                    <div style={buttonContainerStyle}>
                        <button 
                            style={buttonStyle(editHoverStates[index])} 
                            onClick={() => editTask(index)} 
                            onMouseEnter={() => {
                                const newStates = [...editHoverStates];
                                newStates[index] = true;
                                setEditHoverStates(newStates);
                            }} 
                            onMouseLeave={() => {
                                const newStates = [...editHoverStates];
                                newStates[index] = false;
                                setEditHoverStates(newStates);
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
