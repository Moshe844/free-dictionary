import { useState } from 'react';
import '../forms.css';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import PasswordChecklist from 'react-password-checklist';
import { useAuthValue } from '../AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useRef } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const captchaRef = useRef(null);

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError('Passwords does not match');
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    captchaRef.current.reset();
    setError('');
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password, name)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate('/verify-email');
            })
            .catch((err) => alert(err.message));
        })
        // .catch((err) => setError(err.message));
        .catch((err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              setError('Email already in use');
              break;

            default:
              console.log(err.message);
              console.log(err.code);
              break;
          }
        });
    }

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="center-it center">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            className="hover"
            type="name"
            value={name}
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="hover"
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="hover"
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="hover"
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <PasswordChecklist
            rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
            minLength={5}
            value={password}
            valueAgain={confirmPassword}
          />
          <ReCAPTCHA sitekey="6LfovekiAAAAAMVcSiw_Pl6lLXsXZ4YKzDu5OJhr" ref={captchaRef} />
          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
