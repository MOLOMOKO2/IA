import React from 'react';
import { Link } from 'react-router-dom';
import './style/Signup.css';
import profile from "./assets/images/a.jpg"
import { FaEnvelope, FaLock, } from 'react-icons/fa';
import {BsPencilSquare} from 'react-icons/bs'

function Signup() {
  
  return (
    <div className='signupClass'>
      
      <div className="signupContainer">
            <div className="imageWrapper">
                <img src={profile} alt="Profile" />
            </div>
        <h2 className='FormName'>Sign-Up</h2>
        <form action=''>
          <div className='signupForm'>
            <label htmlFor='name'>Name</label>
            <input type='text' placeholder='Enter Name' />
          </div>
          <div className='signupForm'>
            <label htmlFor='email'>
              <FaEnvelope />
              Email
            </label>
            <input type='email' placeholder='Enter Email' />
          </div>
          <div className='signupForm'>
            <label htmlFor='password'>
              <FaLock />
              Password
            </label>
            <input type='password' placeholder='Enter Password' />
          </div>
          <div className='signupForm'>
            <label htmlFor='password'><BsPencilSquare/>Confim Password</label>
            <input type='password' placeholder='Enter Password' />
          </div>
          <button className='btn btn-success'>SignUp</button>
          <div className='checkboxForm'>
            <input type='checkbox' id='terms' name='terms' />
            <label htmlFor='terms'>I agree to the terms and policies</label>
          </div>
          <Link to='/' className='btn btn-default border'> You Already Have Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
