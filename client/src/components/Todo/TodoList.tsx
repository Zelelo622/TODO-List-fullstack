import { useDispatch, useSelector } from "react-redux";
import type { ReactElement } from "react";
import { useState, useMemo } from "react";
import type { RootState } from "src/redux/store";
import { clearCompleted } from "src/redux/todos/todosSlice";
import TodoItem from "./TodoItem";

type FilterType = "all" | "active" | "completed";

const TodoList = (): ReactElement => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  return (
    <div className="relative z-[2]">
      <div className="todos bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg drop-shadow-lg shadow-lg">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
          />
        ))}

        {filteredTodos.length === 0 && (
          <p className="text-center py-5 text-xl text-[#000] dark:text-[#fff]">
            Нет задач для отображения
          </p>
        )}

        <div className="flex items-center justify-between p-4 text-darkGrayishBlueLight dark:text-veryDarkGrayishBlue1">
          <span>
            {todos.filter((t) => !t.completed).length} задач не выполнено
          </span>

          <div className="hidden md:flex items-center gap-3">
            <span
              className={`cursor-pointer ${
                filter === "all" && "text-brightBlue"
              }`}
              onClick={() => setFilter("all")}>
              Все
            </span>
            <span
              className={`cursor-pointer ${
                filter === "active" && "text-brightBlue"
              }`}
              onClick={() => setFilter("active")}>
              Активные
            </span>
            <span
              className={`cursor-pointer ${
                filter === "completed" && "text-brightBlue"
              }`}
              onClick={() => setFilter("completed")}>
              Выполненные
            </span>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => dispatch(clearCompleted())}>
            Очистить выполненные
          </button>
        </div>
      </div>

      <div className="flex md:hidden justify-around items-center gap-3 mt-5 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg drop-shadow-lg shadow-lg p-4 text-darkGrayishBlueLight dark:text-veryDarkGrayishBlue1">
        <span
          className={`cursor-pointer ${filter === "all" && "text-brightBlue"}`}
          onClick={() => setFilter("all")}>
          Все
        </span>
        <span
          className={`cursor-pointer ${
            filter === "active" && "text-brightBlue"
          }`}
          onClick={() => setFilter("active")}>
          Активные
        </span>
        <span
          className={`cursor-pointer ${
            filter === "completed" && "text-brightBlue"
          }`}
          onClick={() => setFilter("completed")}>
          Выполненные
        </span>
      </div>
    </div>
  );
};

export default TodoList;
