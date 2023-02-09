import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {useState } from 'react'
import './css/Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'

const Navbar = () => {

  const dispatch = useDispatch();
  


  const navigate = useNavigate();


  let isLoggedIn;
  
  const fromLocalStorage = JSON.parse(localStorage.getItem('user'))

  
  const user =  fromLocalStorage;

  
  console.log(user)

  // ! if there is a firstName field in the user object then we know that there is a user logged in


  // ! this question mark and dot syntax means that => if there is a firstName present then only proceed
  // ! I got so many errors saying that user.firstName is undefined(obviously when the user logged out)
  // ! doing this saved my life because now it only proceeds once there is a firstName field present
  if(user?.firstName){
    isLoggedIn = true;

  }
  
  


  const logOut = ()=>{
    console.log('logout')
    // ! remove item from localStorage (because it is kind of a source of truth for us to know what is the reality right now)
    // ! regarding where a user is logged in or not! 
    // ! once we remove it from localStorage, no other component will be able to find it
    // ! and so there will be nothing when we use localStorage.getItem('user')
    // ! which also means that user?.firstName will be amount to false
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type:"LOGIN_ERROR"});
    Swal.fire({
      icon:'success',
      title:'You have been successfully Logged Out'
    })
    navigate('/login');
  }
  
  

    // ! array of objects where each object holds information about
    // ! a certain link
    const navigationLinks = [
        {
            id:1,
            // ! whenever this will be called Navbar component will be rendered
            // ! the index property in the AddSales route located in App.js will automatically trigger the AddSales Page

            path:'/',
            text:'Add Sales'
        },
        {
            id:2,
            path:'/todays-revenue',
            text:`Today's  Total Revenue`
        },
        {
            id:3,
            path:'/login',
            text:'Login'
        },
        {
            id:4,
            path:'/top-five-sales',
            text:'Top Five Sales'
        },
        {
            id:5,
            path:'/register',
            text:'Register'
        },
        
    ]

   
  return (
    <div>
        {/* ! this represents the entire layout of the application. the navbar
            does not change for the entire application. it stays at the same 
            place.
        */}
        <nav className="navbar navbar-expand-md bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Sales App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0 ">
        {
            navigationLinks.map((navigationLink)=>{
              // ! if the user is logged in, then don't show the register link in the navbar
              // ! we know whether a user is logged in or not using the redux state through the useSelector Hook
              if((navigationLink.path==='/register' || navigationLink.path==='/login') && isLoggedIn){
                return
              }
                return <li className="nav-item" key={navigationLink.id}>
                <NavLink className={({isActive})=>(isActive?"active nav-link":"nav-link")} to={navigationLink.path}>{navigationLink.text}</NavLink> 
               </li>
            })
        }
       
        
        
       {isLoggedIn ?  <li className="nav-item">
          <a className="nav-link" style={{cursor:"pointer"}} onClick={()=>logOut()}>LOGOUT</a>
        </li> : ''}
      </ul>
     
    </div>
  </div>
</nav>
{/* ! this outlet component renders the nested routes. this is the 
    content 

*/}
{/*  Outlet will show any component that is nested within the parent route. */}
        <Outlet />
    </div>
  )
}

export default Navbar