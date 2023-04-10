import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import ProtectedRoutesAuth from "./middleware/ProtectedRoutesAuth";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutesAuth />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
