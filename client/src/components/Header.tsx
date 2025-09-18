import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import type { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "src/redux/store";
import { toggleTheme } from "src/redux/themeSlice";

const Header = (): ReactElement => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <header className="flex justify-between items-center w-full z-[2] relative">
      <div className="logo dark:text-veryLightGray text-veryDarkBlue font-bold text-3xl md:text-6xl tracking-[10px] md:tracking-[20px]">
        TODO
      </div>
      <div className="switch">
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
