import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Members from "./Members";
import EditUser from "./EditUser";
import Logout from "./Logout";
function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });
  return (
    <BrowserRouter>
      <div>
        {login ? (
          <div className='links'>
            <Link to='/members'>Members</Link>
            <div className='links'>
              <Link to='/edit'>Edit User</Link>
            </div>
            <div className='links'>
              <Link to='/logout'>logout</Link>
            </div>
          </div>
        ) : (
          <div>
            <div className='links'>
              <Link to='/register'>Register</Link>
            </div>
            <div className='links'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
        )}
      </div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/members' element={<Members />} />
        <Route path='/edit' element={<EditUser />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
