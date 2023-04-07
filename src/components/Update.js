import axios from "axios";

import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import User from "../User";
function Update() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Status, setStatus] = useState("");
  const [Type, setType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put('http://localhost:8081/update/' +id, { Name, Email ,Password,Phone,Status,Type })
      .then((res) => {
        console.log(res.data);
        navigate('../User');
      })
      .catch((err) => console.log(err));
  }
  return (<div className="form-modal">
  <div className="form-modal-content">
    <h2>Add User</h2>
    <form onSubmit={handleSubmit} className="add-user-form">
      <label>Name:</label>
      <input type="text" name="name"  onChange={e =>setName(e.target.value)} />

      <label>Email:</label>
      <input type="email" name="email" onChange={e =>setEmail(e.target.value)}/>

      <label>Password:</label>
      <input type="password" name="password" onChange={e =>setPassword(e.target.value)} />

      <label>Phone:</label>
      <input type="text" name="phone" onChange={e =>setPhone(e.target.value)}/>

      <label>Status:</label>
      <select name="status" onChange={e =>setStatus(e.target.value)}>
        <option value="0">Inactive</option>
        <option value="1">Active</option>
      </select>

      <label>Type:</label>
      <select name="type" onChange={e =>setType(e.target.value)}>
        <option value="">--SELECT--</option>
        <option value="1">Admin</option>
        <option value="2">Instructor</option>
        <option value="3">Student</option>
      </select>

      <button type="submit" >
        Add User
      </button>
      
      
    </form>
  </div>
</div>
);
}
export default Update;
