import { Route, Routes } from "react-router";
import "./App.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import ProtectedRoutesAuth from "./middleware/ProtectedRoutesAuth";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutesAuth />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;