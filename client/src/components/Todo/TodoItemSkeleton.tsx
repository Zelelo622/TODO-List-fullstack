import { type ReactElement } from "react";

const TodoItemSkeleton = (): ReactElement => {
  return (
    <li className="flex items-center justify-between bg-white dark:bg-veryDarkDesaturatedBlue p-3 rounded-lg shadow mb-2 animate-pulse">
      <div className="flex items-center gap-2 flex-1">
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </li>
  );
};

export default TodoItemSkeleton;
