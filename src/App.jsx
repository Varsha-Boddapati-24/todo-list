import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

function App() {
   // Holds the list of tasks with their id, text, and completion status
  const [tasks, setTasks] = useState([])
  // Tracks the current text value when editing a task
  const [editText, setEditText] = useState("")
    // Stores the ID of the task currently being edited
  const [editTaskId, setEditTaskId] = useState(null)
 // Manages the current filter selection (all, done, todo)
  const [filter, setFilter] = useState("");

 // Toggles the `completed` status of a task by ID
  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);//update task list
  };

   // Adds a new task to the list after validating that input isn't empty
  const addTask = (text) => {
    if (!text.trim()) {
      alert("Task cannot be empty.");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text, completed: false }])
    setFilter("");// reset filter after new task addition
  }

  // Initializes edit mode for a task by setting its ID and existing text
  const editTask = (id, text) => {
    setEditText(text)
    setEditTaskId(id)
  }

  // Saves the updated task text after validating it's not empty
  const onSave = () => {
     if (!editText.trim()) {
    alert("Task cannot be empty.");
    return;
  }
    const updatedtasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, text: editText } : task
    )
    setTasks(updatedtasks);
    setEditTaskId(null);// exit edit mode
    setEditText('');
  }

   // Deletes a task by filtering it out from the state array
  const onDelete = (id) => {
    const updatedtasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedtasks);

  }

   // Cancels editing and resets input field to original task text
  const onCancel = () => {
    const originalText = tasks.find(task => task.id === editTaskId)?.text || '';
    setEditText(originalText);// restore original text if user cancels edit

    setEditTaskId(null);
  };

   // Returns a filtered task list based on selected status
  const filteredTasks = tasks.filter(task => {
    if (filter === "done") {
      return task.completed === true;
    } else if (filter === "todo") {
      return task.completed === false;
    }
    return true;
  });

  return (
    <>
      <div className="app-container">

         {/* Header handles task input and addition */}
        <Header addTask={addTask} />
        {/* UI for selecting filter and displaying heading */}
        <div className="filter-container">
          <h1 className="todo-heading">To-Do List</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="" disabled >Filter</option>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="todo">To-Do</option>
          </select>
        </div>
          {/* Conditional rendering: Show task list if available, else fallback messages */}
        {filteredTasks.length > 0 ? (
          <ToDoList tasks={filteredTasks} onEdit={editTask} onSave={onSave} onDelete={onDelete} handleCheckboxChange={handleCheckboxChange} editText={editText} editTaskId={editTaskId} setEditText={setEditText} onCancel={onCancel} />
        ) : (
          <p className="empty-message">
            {filter === 'done'
              ? 'No completed tasks yet.'
              : filter === 'todo'
                ? 'No pending tasks.'
                : 'No tasks available.'}
          </p>
        )}


      </div>
    </>
  )
}

export default App
