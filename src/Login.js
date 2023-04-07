import React from "react";
import { useState } from "react";
import './style/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import validation from './loginvalidation';
import axios from "axios";


function Login() {
  const[values,setvalues]=useState({
    email:'',
    password :''
  })
  const navigate =useNavigate();
  const [errors,seterror]=useState({});
  const handleInput =(e)=>{
    setvalues(prev =>({
      ...prev,[e.target.name]:[e.target.value]
    }))
  }
  const handle =(e)=>{
    e.preventDefault();
    seterror(validation(values));
    if( errors.email === ""  &&  errors.password === ""){
      axios.post('http://localhost:8081/login',values)
      .then(res =>{
        if(res.data === "succ"){
          navigate('User');
        }
        else{
          console.log(res);
        }
      })
      .catch(err => console.log(err));
    }
  }

  // const login =(event)=>{
  //   event.preventDefault();
  //   Axios.post('http://localhost:8081/login',{
  //     email :email,
  //     password :password,
  //   }).then((response)=>{
  //     console.log(response);
  //   })
  // }
  return (
    <div className='loginClass'>
      <div className='loginContiner'>
      <h2 className='FormName'>Log-in</h2>
        <form action="" onSubmit={handle}>
          <div className='loginForm'>
            <label htmlFor='email'><FaEnvelope />Email</label>
            <input type='email' placeholder='Enter Email'  onChange={handleInput} name='email' />
          {errors.email &&<span className="text-danger"> {errors.email}</span>}
          </div>

          <div className='loginForm'>
            <label htmlFor='password'><FaLock />Password</label>
            <input type='password' onChange={handleInput} placeholder='Enter Password'name='password'  />
            {errors.password &&<span className="text-danger"> {errors.password}</span>}
          </div>
          <button  className='btn btn-success' type="submit"  value="login"/>
          <Link to='/dashboard' className='btn btn-default border'>To the dashboard</Link>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
