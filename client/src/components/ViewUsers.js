import React, {useEffect, useState} from "react";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div className="container" style={{ marginTop: '140px', maxWidth: '1200px' }}>
      <h3 style={{ color: '#333', fontWeight: '500', marginBottom: '2rem' }}>Users List</h3>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ color: '#666', fontWeight: '500' }}>#</th>
            <th scope="col" style={{ color: '#666', fontWeight: '500' }}>Email</th>
            <th scope="col" style={{ color: '#666', fontWeight: '500' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ color: '#666', fontWeight: '500' }}>{index + 1}</td>
              <td style={{ color: '#333', fontWeight: '500' }}>{user.email}</td>
              <td style={{ color: '#333', fontWeight: '500' }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
