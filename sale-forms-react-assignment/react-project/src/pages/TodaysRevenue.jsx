import React, { useEffect, useState } from 'react'
import './css/styles.css'
import { getTodaysRevenue } from '../api-calls/apiCalls'



const TodaysRevenue = () => {

  const [revenue,setRevenue] = useState()

  
  const generateTodaysRevenue = async()=>{
    // ! get today's revenue from the backend
    const response = await getTodaysRevenue();

    // ! then set that revenue

    // !sum_val is coming from the aggregate function we defined in the backend! remember?
    
    setRevenue(response.data.revAmount[0].sum_val)
  

   
  }
  
  useEffect(()=>{
    generateTodaysRevenue();
  },[])

  
  return (
    <div className='content-container'>
      
        <h2 className='text-center'>{revenue ? `Today's revenue is $ ${revenue}`:' No revenue for today'}</h2>
    </div>
  )
}

export default TodaysRevenue