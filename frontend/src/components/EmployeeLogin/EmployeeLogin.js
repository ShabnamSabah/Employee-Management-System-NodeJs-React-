import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assests/style.css'
import {  useNavigate } from 'react-router-dom';

//Admin Login

 const EmployeeLogin = () => {
   
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, SetError] = useState('')
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
    e.preventDefault();

    const res = await fetch('/employeeLogin',{
        method: "POST",
        headers:{
           
            "Content-Type": "application/json"
        },
      
        body: JSON.stringify({
            email,
            password
        })

    })
    const data = await res.json();
    if(res.status === 400 || !data){
        console.log(data.error)
        SetError(data.error)
    }else{
        const id = data.id
        navigate('/employeeDetail/'+id)
    }
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>
            {error && error}
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' 
                  onChange={e=> setEmail(e.target.value)} className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                  onChange={e=> setPassword(e.target.value)} className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'> LogIn</button>
            <p>You are agree to aour terms and policies</p>
        </form>
    </div>
</div>
  )
}

export default EmployeeLogin