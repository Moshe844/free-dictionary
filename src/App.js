import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/login/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<h1>REGISTER COMPONENT HERE</h1>} />
    </Routes>
  );
};

export default App;
