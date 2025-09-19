import { type ReactElement, useState } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery
} from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { setTokens } from "../redux/auth/authSlice";
import type { IAuthError } from "src/redux/auth/types";

const LoginPage = (): ReactElement => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { refetch } = useMeQuery(undefined, { skip: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setIsSubmitting(true);
    try {
      let res;
      if (isRegister) {
        await register({ username, password }).unwrap();

        res = await login({ username, password }).unwrap();
      } else {
        res = await login({ username, password }).unwrap();
      }
      dispatch(setTokens(res));
      await refetch();
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "data" in err
          ? ((err as IAuthError).data?.error ??
            "Произошла ошибка при авторизации")
          : "Произошла ошибка при авторизации";

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 dark:bg-veryDarkDesaturatedBlue bg-veryLightGray rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-veryLightGray text-veryDarkBlue">
        {isRegister ? "Регистрация" : "Вход"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Имя"
          className="w-full p-2 border rounded dark:text-veryLightGray text-veryDarkBlue placeholder:text-darkGrayishBlueLight dark:placeholder:text-darkGrayishBlueDark"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-2 border rounded dark:text-veryLightGray text-veryDarkBlue placeholder:text-darkGrayishBlueLight dark:placeholder:text-darkGrayishBlueDark"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!username || !password || isSubmitting}
          className="w-full p-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting
            ? "Загрузка..."
            : isRegister
              ? "Зарегистрироваться"
              : "Войти"}
        </button>
      </form>
      <button
        className="mt-4 text-sm text-blue-500 cursor-pointer hover:opacity-55"
        onClick={() => {
          setIsRegister((prev) => !prev);
          setUsername("");
          setPassword("");
          setError(null);
        }}>
        {isRegister
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрируйся"}
      </button>
    </div>
  );
};

export default LoginPage;
