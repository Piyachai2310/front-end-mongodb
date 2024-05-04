import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: '',
    fname: '',
    lname: '',
    username: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://expressapimongodb-production-dcd3.up.railway.app/users');
    const data = await response.json();
    setUsers(data);
  }

  const createUser = async () => {
    const response = await fetch('https://expressapimongodb-production-dcd3.up.railway.app/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const result = await response.json();
    console.log(result);
    fetchUsers();
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Management</h1>
      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <h2 className="mb-3">Create User</h2>
          <div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="ID" value={newUser.id} onChange={e => setNewUser({ ...newUser, id: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="First Name" value={newUser.fname} onChange={e => setNewUser({ ...newUser, fname: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Last Name" value={newUser.lname} onChange={e => setNewUser({ ...newUser, lname: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Username" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Avatar" value={newUser.avatar} onChange={e => setNewUser({ ...newUser, avatar: e.target.value })} />
            </div>
            <button className="btn btn-primary" onClick={createUser}>Create User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
