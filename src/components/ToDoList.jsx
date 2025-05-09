
import TodoItem from "./TodoItem";
function ToDoList(props){
    return(
        <>
           {/* Map through the tasks array and render a TodoItem for each task */}
        {
            
            props.tasks.map((task)=><TodoItem key={task.id} task={task} onEdit={props.onEdit} onSave={props.onSave} onDelete={props.onDelete} handleCheckboxChange={props.handleCheckboxChange}  editText={props.editText} editTaskId={props.editTaskId} setEditText={props.setEditText} onCancel={props.onCancel}/> )
        }
        </>
    )
}
export default ToDoList;