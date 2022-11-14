import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Profile from './pages/Profile';
import Register from './pages/Register/Register';
import PrivateRoute from './pages/PrivateRoute';
import VerifyEmail from './pages/verifyEmail';
import { useContext, useState } from 'react';

import { AuthProvider } from './pages/AuthContext';
import Reset from './pages/Reset';
import { UserContext } from './Context/User.context';
import Header from './components/Header';

function App() {
  const { currentUser } = useContext(UserContext);
  const [timeActive, setTimeActive] = useState(false);

  return (
    <AuthProvider value={{ timeActive, setTimeActive }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Outlet />}> */}
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={!currentUser?.emailVerified ? <Login /> : <Profile />} />
        <Route path="register" element={!currentUser?.emailVerified ? <Register /> : <Navigate to="/" replace />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route exact path="reset" element={<Reset />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
