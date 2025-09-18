import { useEffect, type ReactElement } from "react";
import type { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

const App = (): ReactElement => {
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
