import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/DashBoard.css";
import Sidebar from "./components/Sidebar";

const AdminDashboard = () => {
  const [adminsCount, setAdminsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setUsers(res.data);
        setAdminsCount(res.data.filter((user) => user.Type === 1).length);
        setInstructorsCount(res.data.filter((user) => user.Type === 2).length);
        setStudentsCount(res.data.filter((user) => user.Type === 3).length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar logo={<i className="bx bxs-school"></i>} name="FCIH " openOnHover={false} />
      <div>
        <div className="admin-dashboard-sidebar"></div>
        <h1 className="dashboard-page-title">Admin Dashboard</h1>
        <div className="dashboard-container">
          <div className="dashboard-card admins-card">
            <h2 className="dashboard-card-title">Admins</h2>
            <p className="dashboard-card-value">{adminsCount}</p>
          </div>
          <div className="dashboard-card students-card">
            <h2 className="dashboard-card-title">Students</h2>
            <p className="dashboard-card-value">{studentsCount}</p>
          </div>
          <div className="dashboard-card instructors-card">
            <h2 className="dashboard-card-title">Instructors</h2>
            <p className="dashboard-card-value">{instructorsCount}</p>
          </div>
          <div className="dashboard-card courses-card">
            <h2 className="dashboard-card-title">Courses</h2>
            <p className="dashboard-card-value">20</p>
          </div>
        </div>
        <div className="user-table-container">
            <h2 className="user-table-title">Users</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Type === 1 ? "Admin" : user.Type === 2 ? "Instructor" : "Student"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
