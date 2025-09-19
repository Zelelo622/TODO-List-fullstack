import { type ReactElement, useState, useMemo } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from "src/redux/todos/todosApi";
import TodoItem from "./TodoItem";
import type { ITodo } from "src/redux/todos/types";
import TodoItemSkeleton from "./TodoItemSkeleton";

type TFilter = "all" | "active" | "completed";

const TodoList = (): ReactElement => {
  const { data: todos = [], isLoading } = useGetTodosQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [filter, setFilter] = useState<TFilter>("all");

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

  const handleToggle = (todo: ITodo) =>
    updateTodo({ id: todo.id, completed: !todo.completed });

  const handleDelete = (id: number) => deleteTodo(id);

  const handleClearCompleted = () => {
    todos.filter((t) => t.completed).forEach((t) => deleteTodo(t.id));
  };

  return (
    <div className="relative z-[2]">
      <div className="todos bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg drop-shadow-lg shadow-lg">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TodoItemSkeleton key={i} />
            ))
          : filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={(id, title) => updateTodo({ id, title })}
              />
            ))}

        {!isLoading && filteredTodos.length === 0 && (
          <p className="text-center py-5 text-xl text-[#000] dark:text-[#fff]">
            Нет задач для отображения
          </p>
        )}

        <div className="flex items-center justify-between p-4 text-darkGrayishBlueLight dark:text-veryDarkGrayishBlue1">
          <span>
            {todos.filter((t) => !t.completed).length} задач не выполнено
          </span>

          <div className="hidden md:flex items-center gap-3">
            {(["all", "active", "completed"] as TFilter[]).map((f) => (
              <span
                key={f}
                className={`cursor-pointer ${filter === f ? "text-brightBlue" : ""}`}
                onClick={() => setFilter(f)}>
                {f === "all"
                  ? "Все"
                  : f === "active"
                    ? "Активные"
                    : "Выполненные"}
              </span>
            ))}
          </div>

          <button className="cursor-pointer" onClick={handleClearCompleted}>
            Очистить выполненные
          </button>
        </div>
      </div>

      {/* мобильные фильтры */}
      <div className="flex md:hidden justify-around items-center gap-3 mt-5 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg drop-shadow-lg shadow-lg p-4 text-darkGrayishBlueLight dark:text-veryDarkGrayishBlue1">
        {(["all", "active", "completed"] as TFilter[]).map((f) => (
          <span
            key={f}
            className={`cursor-pointer ${filter === f ? "text-brightBlue" : ""}`}
            onClick={() => setFilter(f)}>
            {f === "all" ? "Все" : f === "active" ? "Активные" : "Выполненные"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
