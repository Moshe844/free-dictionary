import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../Context/User.context';
import { signOut } from 'firebase/auth';
import { auth } from '../pages/firebase';
import SearchField from './SearchField';

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="bg-gray-700">
      <nav>
        <div className="nav">
          {!currentUser?.emailVerified ? (
            <>
              <Link to="/login" className="nav-Link">
                Sign in
              </Link>
              <Link to={'/register'} className="nav-Link">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to={'/profile'} className="nav-Link">
                Profile
              </Link>
              <span className="pointer" onClick={handleSignOut(auth)}>
                Sign Out
              </span>
            </>
          )}
        </div>
      </nav>
      <SearchField />
    </div>
  );
};

export default Header;
