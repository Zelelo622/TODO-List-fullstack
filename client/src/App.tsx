import { useEffect, type ReactElement } from "react";
import type { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useMeQuery } from "./redux/auth/authApi";
import { logout, setUser } from "./redux/auth/authSlice";
import Spinner from "./components/Spinner";
import AppRouter from "./routes/AppRouter";

const App = (): ReactElement => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { data, isSuccess, isLoading, isError, refetch } = useMeQuery(
    undefined,
    {
      skip: !accessToken
    }
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data, isLoading]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return <AppRouter />;
};

export default App;
