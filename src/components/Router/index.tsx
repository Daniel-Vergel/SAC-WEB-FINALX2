import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/home";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

