import { useState, type ReactElement, type ChangeEvent } from "react";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import type { ITodo } from "src/redux/todos/types";

interface TodoItemProps {
  todo: ITodo;
  onToggle: (todo: ITodo) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate
}: TodoItemProps): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditText(e.target.value);

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.title) {
      onUpdate(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center bg-white dark:bg-veryDarkDesaturatedBlue p-3 rounded-lg shadow mb-2 w-full min-w-0">
      <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleChange}
            className="w-full outline-none bg-[rgba(0,0,0,0)] text-gray-900 dark:text-gray-50"
          />
        ) : (
          <span
            className={
              todo.completed
                ? "line-through text-gray-400 truncate flex-1"
                : "text-gray-900 dark:text-gray-50 truncate flex-1"
            }>
            {todo.title}
          </span>
        )}
      </label>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="cursor-pointer text-green-500 hover:text-green-700">
            <CheckOutlined style={{ fontSize: "16px" }} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-blue-500 hover:text-blue-700">
            <EditOutlined style={{ fontSize: "16px" }} />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="cursor-pointer text-red-500 hover:text-red-700">
          <DeleteOutlined style={{ fontSize: "16px" }} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
