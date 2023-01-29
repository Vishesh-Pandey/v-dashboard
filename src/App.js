import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
