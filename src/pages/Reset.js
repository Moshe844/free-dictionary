import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/reset");
  }, [user, loading, navigate, error]);
  return (
    <div className="reset">
      <form
        className="reset__container"
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordReset(email);
        }}
      >
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="submit"
          value="Send password reset email"
          sendPasswordReset={sendPasswordReset}
        />
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </form>
    </div>
  );
}
export default Reset;
