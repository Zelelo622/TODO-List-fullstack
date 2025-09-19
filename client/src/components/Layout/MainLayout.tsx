import { type ReactElement } from "react";
import Header from "../Header";

interface IMainLayoutProps {
  children: ReactElement;
}

const MainLayout = ({ children }: IMainLayoutProps): ReactElement => {
  return (
    <div className="dark:bg-veryDarkBlue bg-veryLightGray min-h-screen">
      <div className="container pt-10 pb-10 pl-3 pr-3 mx-auto">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
