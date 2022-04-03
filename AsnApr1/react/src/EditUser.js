import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function EditUser() {
  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [msg,setMsg]=useState('');
  useEffect(() => {
    if (!token) {
      setLogin(false);
      console.log(token);
      console.log(login);
    } else {
      setLogin(true);
      console.log(token);
      console.log(loggedUser);
      axios
        .get(`/users/${loggedUser}`, { headers: { token } })
        .then((res) => {
          setName(res.data.data.name);
          setDob(res.data.data.dob);
          setPassword(res.data.data.password);
          setEmail(res.data.data.email);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const editUser = (e) => {
    e.preventDefault();
    const userOb = {
      name,
      email,
      dob,
      password,
    };
    console.log(userOb);
    axios
      .put(`users/${loggedUser}`, userOb, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMsg(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div >
      {login ? (
        <div >
          <h2>Edit Details</h2>
          <form onSubmit={editUser}>
             <b>Enter Email:</b>
            <br/>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
              <b>Enter Username:</b><br/>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
              <b>Enter Password:</b><br/>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
              <b>Enter Date of Birth:</b><br/>
            <input
              type="date"
              name="dob"
              required
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
            <br />
            <button
              type="submit"
              className="btn1"
            >
              Save
            </button>
          </form>
          <p className="msg">{msg}</p>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
