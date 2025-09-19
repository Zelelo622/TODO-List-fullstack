import { type ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "src/redux/store";

interface Props {
  children: ReactElement;
}

const PublicRoute = ({ children }: Props): ReactElement => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return !isAuth ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
