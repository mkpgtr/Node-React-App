import React, { Children, useEffect, useState } from 'react'

import { useNavigate,Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const ProtectedRoute = ({children}) => {

    const fromLocalStorage = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()



    if(!fromLocalStorage?.firstName){
       
        return <Navigate to ='/login' />
    //    return <h1 className='text-center' style={{margin:"4rem auto"}}>Please Login to See this page</h1>
    }

    
    return children
    
    

   

  

   

}

export default ProtectedRoute