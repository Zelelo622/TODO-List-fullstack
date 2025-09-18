import { useDispatch } from "react-redux";
import type { ReactElement } from "react";
import { toggleTodo, deleteTodo } from "src/redux/todosSlice";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem = ({ id, text, completed }: TodoItemProps): ReactElement => {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between bg-white dark:bg-veryDarkDesaturatedBlue p-3 rounded-lg shadow mb-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleTodo(id))}
        />
        <span
          className={
            completed
              ? "line-through text-gray-400"
              : "text-gray-900 dark:text-gray-50"
          }>
          {text}
        </span>
      </label>
      <button
        onClick={() => dispatch(deleteTodo(id))}
        className="text-red-500 hover:text-red-700">
        Удалить
      </button>
    </li>
  );
};

export default TodoItem;
