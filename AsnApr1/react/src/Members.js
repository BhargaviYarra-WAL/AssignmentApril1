import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Members() {
  const token = localStorage.getItem("token");
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!token) {
      setLogin(false);
      console.log(token);
    } else {
      setLogin(true);
      console.log(token);
      axios
        .get(`/users/list`, { headers: { token } })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div>
      {login ? (
        <div>
          <h2>Users</h2>
          <div>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Date of birth</th>
            </tr>
          </div>
          {users.map((user) => (
            <div>
              <tr>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.dob}</td>
              </tr>
            </div>
          ))}
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
