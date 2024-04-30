import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login, Signup, Home, Dashboard, Error, Profile } from "./pages";
import { Layout } from "./components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route element={<PrivateRoute />}>
            <Route path="me" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
