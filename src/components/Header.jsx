import { useState } from 'react';
import './Header.css';
function Header(props){
    // Initializing state to hold the input value for the task
    const [text,setText]=useState("")
    
    // Function to handle adding a task
    const handleAddTask = () => {
        props.addTask(text);// Calling the parent component's addTask function with the text as argument
        setText("");  // Resetting the input field after the task is added
    };
    return(
        <>
        <div className='header'>
        <h1>Todo Input</h1> {/* Header for the Todo section */}
        <div className='add-container'>
        <input type="text" className='task-input' value={text} onChange={(e)=>{
           setText(e.target.value)// Updating the state with the new input value

            }}/>
        <button className='addBtn' onClick={handleAddTask}>Add Task</button>{/* Button to add the task */}
        </div>
        </div>
      
        </>
    )
}
export default Header;