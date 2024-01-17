import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";

function App() {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
