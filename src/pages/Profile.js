import './Profile.css';
import { useAuthValue } from './AuthContext';
// import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {auth.currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {`${auth.emulatorConfigcurrentUser?.emailVerified}`}
        </p>
        <p>Lets add some cool stuff</p>
      </div>
    </div>
  );
}

export default Profile;
