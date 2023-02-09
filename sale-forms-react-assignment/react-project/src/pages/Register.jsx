import React, { useState } from 'react'
import './css/styles.css'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api-calls/apiCalls';
import Swal from 'sweetalert2';

const initialValue = {
  firstName:'',
    lastName:'',
    email:'',
    password:''
}
const Register = () => {

  const [registerDetails,setRegisterDetails] = useState(initialValue);

  const handleChange = (e)=>{
    setRegisterDetails({...registerDetails,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate()

  const togglePage = ()=>{
    navigate('/login');
  }

  const register = async()=>{
    const response = await registerUser(registerDetails);
    if(response?.status===200){
      Swal.fire({
        icon:'success',
        title:response.data.msg
      })
      navigate('/login')
      
    }
    if(response?.status===401 || response?.status === 404){
      Swal.fire({
        icon:'error',
        title:response.data.msg
      })
      navigate('/register')
    }
   
  }
  return (
    <div className='content-container'>
    <h2 className='
    text-center'>Registration Form</h2>
    <div class="mb-3">
<label for="first-name" class="form-label">First Name</label>
<input type="text" class="form-control"  onChange={(e)=>handleChange(e)}  id="first-name" name='firstName' />
</div>
<div class="mb-3">
<label for="last-name" class="form-label">Last Name</label>
<input type="text" onChange={(e)=>handleChange(e)} class="form-control" id="last-name" name='lastName' />
</div>
<div class="mb-3">
<label for="email" class="form-label">Email address</label>
<input type="email"  onChange={(e)=>handleChange(e)}  class="form-control" id="email" name='email'/>
</div>
<div class="mb-3">
<label for="password" class="form-label">Password</label>
<input class="form-control"  onChange={(e)=>handleChange(e)}  type='password' id="password" name='password'></input>
</div>
<div class="mb-3">
<button onClick={()=>register()} class="form-control btn btn-primary"  id="submitBtn" rows="3">Submit</button>
<button type='button' class="form-control btn mt-3" onClick={()=>togglePage()} rows="3">Already Have An Account? Login Here</button>
</div>
</div>
  )
}

export default Register