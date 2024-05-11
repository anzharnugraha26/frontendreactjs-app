 

const TodoItem = ({ todo }) => {
    return (
        <li className={`${todo.done ? "checked" : ""}`}> 
          {todo.title} 
        </li>
      );
}

export default TodoItem