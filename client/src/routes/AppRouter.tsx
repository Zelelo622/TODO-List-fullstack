import { Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";
import LoginPage from "src/pages/LoginPage";
import NotFoundPage from "src/pages/NotFoundPage";
import MainLayout from "src/components/Layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Home />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/login"
      element={
        <PublicRoute>
          <MainLayout>
            <LoginPage />
          </MainLayout>
        </PublicRoute>
      }
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
