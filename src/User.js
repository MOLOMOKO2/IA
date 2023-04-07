import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash} from "react-icons/fa";
import "./style/User.css";
import Addform from "./components/Addform";
import Sidebar from "./components/Sidebar";
import { Link } from 'react-router-dom';
import Update from "./components/Update";
function User() {
  
  const [user, setUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterValue] = useState("");
  const [searchTerm ] = useState("");
  const [searchValue, setSearchValue] = useState("");
 

// Here I make a request from the database to take the data from it
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // The end of the useEffect 

  const getTypeBackgroundColor = (type) => {
    switch (type) {
      case 1:
        return "#6A0DAD";
      case 2:
        return "#0077B6";
      case 3:
        return "#FFA500";
      default:
        return "#FFFFFF";
    }
  };

  const handleAddUser = (newUser) => {
    setUser([...user, newUser]);
    setShowForm(false);
  };
  const handle_delete = async(id) =>{
    try{
      await axios.delete('http://localhost:8081/user/'+id)
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  const handleUpdateUser = (data) => {
    setSelectedUser({ ...data });
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

return (
  <>
    <Sidebar
      logo={<i class='bx bxs-school' ></i>}
      name='FCIH '
      openOnHover={false}
    >
    </Sidebar>
  <div className="page-container">
    <div className="user-container">
      <div className="user-header">
        <div className="add-container">
          <button className="user-button add-button" onClick={() => setShowForm(true)}>
            Add +
          </button>
        </div>
          <div class="filter-container">
            <h4>Search</h4>
            <input
                type="text"
                className="search-input "
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
          </div>
        <table className="user-table">
          <thead>
            <tr>
              <th className="user-table-header">Name</th>
              <th className="user-table-header">Email</th>
              <th className="user-table-header">Password</th>
              <th className="user-table-header">Phone</th>
              <th className="user-table-header">Status</th>
              <th className="user-table-header">Type</th>
              <th className="user-table-header">Action</th>
            </tr>
          </thead>
          <tbody>
              {user
                .filter((data) => {
                  if (
                    (!filterValue && !searchTerm) ||
                    (filterValue === data.Status && searchTerm === data.Type) ||
                    (filterValue === data.Status && !searchTerm) ||
                    (!filterValue && searchTerm === data.Type)
                  ) {
                    return data.Email.includes(searchValue);
                  }
                  return false;
                })
                
                //This map function will loop on all the data (with ID) in the database and make it display below the table header
                
                .map((data) => (
                  <tr key={data._id}>
                    <td>{data.Name}</td>
                    <td>{data.Email}</td>
                    <td>{data.Password}</td>
                    <td>{data.Phone}</td>
                    <td style={{ backgroundColor: data.Status === 1 ? "#28a745" : "#dc3545" }}>
                      {data.Status === 1 ? "Active" : "Inactive"}
                    </td>
                    <td
                      style={{
                        backgroundColor: getTypeBackgroundColor(data.Type),
                        color: "#FFFFFF",
                      }}
                    >
                      {data.Type === 1 ? "Admin" : data.Type === 2 ? "Instructor" : "Student"}
                    </td>
                    <td>
                    <button className="user-button user-button-update" onClick={() => setSelectedUser(data)}><Link to={`/update/${data.ID}`} className='btn btn-primary me-2'>Update</Link>&nbsp;</button>  
                      <button className="user-button user-button-delete" onClick={e => handle_delete(data.ID)}>
                        <FaTrash />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))} // the end of the map function
                
            </tbody>
        </table>
      </div>
      
      {showForm && <Addform handleAddUser={handleAddUser} onClose={handleClose} />}
      {selectedUser && (
        <Update
          onUpdateUser={handleUpdateUser}
          formData={selectedUser}
        />)}
      
    </div>
  </div>
  </>
);
}

export default User;
