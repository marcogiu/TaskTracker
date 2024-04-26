import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Dashboard } from "./pages";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
