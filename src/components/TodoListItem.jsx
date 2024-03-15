import { useState, useEffect } from "react"

function TodoListItem({ todo, handleCheckBox, handleEditTodo, handleDeleteTodo }) {

    //determine whether the task is being editing
    const [editing, setEditing] = useState(false)
    //store the edited title
    const [todoToUpdate, setTodoToUpdate] = useState(todo.title)

    useEffect(() => {
        setTodoToUpdate(todo.title);
    }, [todo]);

    const handleTitleChange = (event) => {
        setTodoToUpdate(event.target.value);
    };
    //toggle edit
    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false)
        //creates a new object by spreading all properties of the original task object (...task) and then overriding the title property with the value of editedTitle
        handleEditTodo({ ...todo, title: todoToUpdate });
    }


    return (
        <div className="listItem">
            {/* check apply to checkbox when todoDtatus == true */}
            <input className="listItemCheckBox" type='checkbox' checked={todo.completed} onChange={() => handleCheckBox(todo.id)} />

            {/* if edit is click (true),show input box */}
            {editing ? (
                <input className='edit-input' type='text' value={todoToUpdate} onChange={handleTitleChange} />
            ) : (
                <h5>{todo.title}</h5>
            )}


            <button className='saveAndEditBtn'onClick={editing ? handleSave : handleEdit}>{editing ? 'Save' : 'Edit'}</button>
            {!editing && <button className='deleteBtn'onClick={() => handleDeleteTodo(todo.id)}>Delete</button>}
        </div>
    )
}

export default TodoListItem