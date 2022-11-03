import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBabo7XfrbgD_z4qIsf3KWHnPwwqUBM5xI",
  authDomain: "fir-user-reg-auth.firebaseapp.com",
  projectId: "fir-user-reg-auth",
  storageBucket: "fir-user-reg-auth.appspot.com",
  messagingSenderId: "720211998290",
  appId: "1:720211998290:web:8291fab2697dbaafc2d18b",
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, sendPasswordReset };
