import React, { useState } from "react";
import axios from "axios";
export default function Register() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const addUser = (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
    };
    axios
      .post("/users/", user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg("");
        } else {
          setMsg(res.data.data);
          setError("");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Registration</h2>
      <p className='error'>{error}</p>
      <form onSubmit={addUser}>
        <b>Enter Email:</b>
        <br />
        <input type='email' name='email' required />
        <br />
        <b>Enter Username:</b>
        <br />
        <input type='text' name='name' required />
        <br />
        <b>Enter Password:</b>
        <br />
        <input type='password' name='password' required />
        <br />
        <b>Enter Date of Birth:</b>
        <br />
        <input type='date' name='dob' required />
        <br />
        <button type='submit' className='btn1'>
          Register
        </button>
      </form>
      <p className='msg'>{msg}</p>
    </div>
  );
}
