import { Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
