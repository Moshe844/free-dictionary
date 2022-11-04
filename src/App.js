import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import PrivateRoute from "./pages/PrivateRoute";
import VerifyEmail from "./pages/verifyEmail";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./pages/firebase";
import { AuthProvider } from "./pages/AuthContext";
import Reset from "./pages/Reset";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/login"
          element={
            !currentUser?.emailVerified ? (
              <Login />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !currentUser?.emailVerified ? (
              <Register />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
