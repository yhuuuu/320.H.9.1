import TodoListItem from "./TodoListItem"
import initialState from "../data/todoData"
import { useState, useReducer, Children } from "react";

const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_CHECKBOX: 'toggle-checkbox',
    EDIT_TODO: 'edit-todo',
    DELETE_TODO: 'delete-todo'
}
function reducer(todos, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            if (action.payload.inputValue.trim() !== '') {

                return [
                    newTask(todos, action.payload.inputValue),
                    ...todos
                ]
            }
            return todos; // If inputValue is empty, return the existing state

        case ACTIONS.TOGGLE_CHECKBOX:
            return todos.map((t) => {
               
                if (t.id == action.payload.todoId) {
                    // Toggle the completed status for the task with the given taskId
                    return { ...t, completed: !t.completed };
                } else {
                    // If the task's id doesn't match the taskId, return the task as is
                    return t;
                }
            })
        case ACTIONS.EDIT_TODO:
            return todos.map((t) => {
                if (t.id === action.payload.todo.id) {

                    return action.payload.todo;
                } else {
                    return t;
                }
            })

        case ACTIONS.DELETE_TODO:

            return todos.filter((t) => t.id !== action.payload.todoId)


        default:
            return todos; // For unknown actions, return the existing state
    }
}
function newTask(todos, inputValue) {
    return {
        id: todos.length + 1,
        title: inputValue,
        completed: false
    }

}


function TodoList() {
    //Assign initialState
    const [todos, dispatch] = useReducer(reducer, initialState)
    //const [tasks, setTasks] = useState(initialState)
    const [inputValue, setInputValue] = useState('')



    function handleAddTask() {
        dispatch({ type: ACTIONS.ADD_TODO, payload: { inputValue: inputValue } })

        // Clear the input value
        setInputValue('')
        console.log('New todo added',todos);
    }

    function handleCheckBox(todoId) {
        dispatch({ type: ACTIONS.TOGGLE_CHECKBOX, payload: { todoId: todoId } })
        console.log('Checkbox toggle');
    }

    function handleEditTodo(todo) {
        dispatch({ type: ACTIONS.EDIT_TODO, payload: { todo: todo } })
        console.log('update todo id', todo.id)
    }
    function handleDeleteTodo(todoId) {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: { todoId: todoId } })
        console.log('delete')
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleAddTask}> Add Todo</button>

            {todos.map((todo, index) => (
                <TodoListItem
                    key={index}
                    todo={todo}
                    handleCheckBox={handleCheckBox}
                    handleEditTodo={handleEditTodo}
                    handleDeleteTodo={handleDeleteTodo}
                />
            ))}

        </div>
    )
}

export default TodoList