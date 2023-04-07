import React, { useState } from "react";
import axios from "axios";

function AddUserForm({onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    status: "",
    type: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create", formData)
      .then((res) => {
        console.log(res);
        window.location.reload(); // Refresh the page on success
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-modal">
      <div className="form-modal-content">
        <h2>Add User</h2>
        <form onSubmit={handleFormSubmit} className="add-user-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </select>

          <label>Type:</label>
          <select name="type" onChange={handleInputChange} value={formData.type}>
            <option value="">--SELECT--</option>
            <option value="1">Admin</option>
            <option value="2">Instructor</option>
            <option value="3">Student</option>
          </select>

          <button type="submit" >
            Add User
          </button>
          
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
