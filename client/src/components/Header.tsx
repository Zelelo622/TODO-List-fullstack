import { type ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/auth/authSlice";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { toggleTheme } from "src/redux/theme/themeSlice";
import { authApi } from "src/redux/auth/authApi";

const Header = (): ReactElement => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.theme.value);

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="flex justify-between items-center w-full z-[2] relative">
      <div className="logo dark:text-veryLightGray text-veryDarkBlue font-bold text-3xl md:text-6xl tracking-[10px] md:tracking-[20px]">
        TODO
      </div>
      <div className="flex gap-4 flex-col items-end">
        {isAuth && user ? (
          <div className="flex items-end gap-4">
            <span className="font-medium dark:text-veryLightGray text-veryDarkBlue">
              Имя: {user.username}
            </span>
            <button
              className="px-2 py-1 bg-red-500 cursor-pointer text-veryLightGray rounded hover:bg-red-600"
              onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : null}
        {theme === "dark" ? (
          <SunOutlined
            style={{ color: "hsl(0, 0%, 98%)" }}
            onClick={() => dispatch(toggleTheme())}
          />
        ) : (
          <MoonOutlined
            style={{ color: "hsl(235, 21%, 11%)" }}
            onClick={() => dispatch(toggleTheme())}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
