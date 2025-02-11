import React, { useState } from "react";
import "../Styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import i from "../../images/signUp.jpg";
import loader from "../../images/loader.gif"
import { base_url } from "../../api";

function SignUp() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is "student"

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = async (e) => {
    setLoading(true)
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      role,
    };
    console.log("handleSignUp");
    console.log(data);

    try {
      const response = await axios.post(
        `${base_url}/auth/signup`,
        { username, email, password, role }
      );
      console.log(response.data); // handle the response as per your requirement
      localStorage.setItem('userId',response.data._id)
      navigate("/allquestions");
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="card_container">
          <h2>Sign Up</h2>
          <form>
            <div className="signup_container">
              <div>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChangeUser}
                  value={username}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="ip">
                  {" "}
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="email">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
              </div>
              {/* <div className="roll">
                <label htmlFor="role">Role: </label>
                <input
                  type="radio"
                  id="student"
                  name="role"
                  defaultValue="student"
                  checked={role === "student"}
                  onChange={handleChangeRole}
                  required
                />
                <label htmlFor="student">Student</label>
                <input
                  type="radio"
                  id="teacher"
                  name="role"
                  defaultValue="teacher"
                  checked={role === "teacher"}
                  onChange={handleChangeRole}
                  required
                />
                <label htmlFor="teacher"> Teacher</label>
                <br />
                <br />
              </div> */}
            </div>

            <span onClick={handleSignUp} className={`btnElement_${loading?'loading':""}`}>
              {loading  ? <img style={{width:'40px'}} src={loader} alt="" />:'Sign Up'}
              
            </span>
            <p>
              Already have an account? <Link to="/auth/signin">Sign in</Link>
            </p>
          </form>
        </div>
        <img src={i} className="i" alt="" />
      </div>
    </>
  );
}

export default SignUp;
