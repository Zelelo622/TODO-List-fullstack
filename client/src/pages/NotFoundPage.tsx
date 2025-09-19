import { type ReactElement } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): ReactElement => (
  <div className="dark:bg-veryDarkBlue bg-veryLightGray min-h-screen">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="dark:text-veryLightGray text-veryDarkBlue text-6xl font-bold mb-4">
          404
        </h1>
        <p className="dark:text-veryLightGray text-veryDarkBlue text-xl mb-4">
          Страница не найдена
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          На главную
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
