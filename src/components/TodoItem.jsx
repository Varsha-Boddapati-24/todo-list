import "./ToDoItem.css"
function TodoItem(props) {
// Check if the current task is in edit mode based on its ID
     const isEditing = props.task.id === props.editTaskId;
    return (
        <>
            <div className="todo-item">
                 {/* Display either an input field or a span based on edit mode */}
                {
                    isEditing ? <input type="text" className="editxt-input" value={props.editText} 
                       // Update the text while editing
                    onChange={(e) => props.setEditText(e.target.value)} 
                    /> : 
                       // If task is not in editing mode, show the task text
                    <span className={props.task.completed ?'completed-task':'text-span'}>{props.task.text}</span>
                }



                <div className="action-container">
                       {/* Checkbox for marking task as completed */}
                    <input type="checkbox" className="task-checkbox" checked={props.task.completed} 
                     // Handle checkbox toggle to mark the task as completed or not
                    onChange={()=>{props.handleCheckboxChange(props.task.id)}}
                    />
                    <div className="btn-container">

                        {
                            isEditing ? (
                                <>
                                 {/* Save and Cancel buttons during edit mode */}
                                    <button className="saveBtn" 
                                     // Trigger the save action when clicked
                                    onClick={ props.onSave }>
                                        <i className="fa-solid fa-floppy-disk"></i></button>
                                    <button className="cancelBtn" 
                                    // Trigger the cancel action when clicked
                                    onClick={props.onCancel}><i className="fa-solid fa-xmark"></i></button>
                                </>
                            ) : (
                                <>
                                 {/* Edit and Delete buttons when not in edit mode */}
                                    <button className="editBtn" onClick={() => {
                                         // Trigger edit mode for this task
                                        props.onEdit(props.task.id, props.task.text)
                                    }
                                    }> <i className="fas fa-edit"></i></button>
                                    <button className="deleteBtn" onClick={()=>
                                        {
                                            // Trigger delete task action
                                            props.onDelete(props.task.id)
                                        }
                                    }
                                        ><i className="fa-solid fa-trash"></i></button>
                                </>
                            )
                        }

                    </div>

                </div>

            </div>
        </>
    )

}
export default TodoItem;
