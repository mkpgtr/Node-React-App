import React from 'react'
import './css/styles.css'
import { useState } from 'react'
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api-calls/apiCalls';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';


const initialValue = {
 email:"",
 password:""
}

const Login = () => {

  const dispatch = useDispatch()

  const [loginDetails,setLoginDetails] = useState(initialValue);
  const [loading,setLoading] = useState(false)

  const handleChange = (e)=>{
    // ! dynamic object keys. I use this for form-validation in all my form code for react.
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value});
    console.log(loginDetails)
  }

  const navigate = useNavigate();

  const togglePage = ()=>{
    // ! lets user toggle between login and register pages
    navigate('/register');
  }

  const login = async(req,res)=>{
    setLoading(true)
    console.log('login')
    const response = await loginUser(loginDetails)
    console.log(response,'status bro')
    // ! when the backend sends success
    if(response?.status===200){
      setLoading(false)
      Swal.fire({
        icon:'success',
        title:response.data.msg
      })
      localStorage.setItem('token',response.data.user.token);
      localStorage.setItem('user',JSON.stringify(response.data.user));

      dispatch({type:'LOGIN_SUCCESS',payload:response.data.user});

    
      navigate('/')
    }
    // ! when the backend sends error
    if(response?.status===404 || response?.status===401){
      setLoading(false)
      Swal.fire({
        icon:'error',
        title:response.data.msg
      })
    }
  }
  

  return (
    <>
    {loading && <Loading />}
   <div className='content-container'>
   <h2 className='
   text-center'>Login Form</h2>
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">Email address</label>
<input type="email" required class="form-control" onChange={handleChange
} id="exampleFormControlInput1" name='email'/>
</div>
<div class="mb-3">
<label for="exampleFormControlTextarea1" class="form-label">Password</label>
<input class="form-control" onChange={handleChange
} required id="exampleFormControlTextarea1" type="password" name='password'></input>
</div>
<div class="mb-3">
<button onClick={()=>login()} class="form-control btn btn-primary"  id="submitBtn" rows="3">Submit</button>
<button type='button' class="form-control btn mt-3" onClick={()=>togglePage()} rows="3">Don't Have An Account? Register Here</button>
</div>

</div>

   
    
</>
  )
}

export default Login