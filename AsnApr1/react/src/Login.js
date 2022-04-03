import React, { useState } from "react";
import axios from "axios";
export default function Login() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const getUser = (event) => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post("/users/login", user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg("");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", event.target.email.value);
          setMsg("  login successfull");
          setError("");
          window.location.pathname = "/members";
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Login </h2>
      <p className='error'>{error}</p>
      <form onSubmit={getUser}>
        <b>Enter Email:</b>
        <br />
        <input type='email' name='email' required />
        <br />
        <b>Enter Password:</b>
        <br />
        <input type='password' name='password' required />
        <br />
        <button type='submit' className='btn1'>
          Login
        </button>
      </form>
      <p className='msg'>{msg}</p>
    </div>
  );
}
