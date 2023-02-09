import React, { useEffect, useState } from 'react'
import { getTopFiveApiCall } from '../api-calls/apiCalls.js'
import './css/styles.css'

const initialTopFive = []
const Top5Sales = () => {
  
 
  const [topFive,setTopFive] = useState(initialTopFive)


  const getTopFive = async()=>{
    const response = await getTopFiveApiCall();
    if(response?.status===200){
      setTopFive([...response.data.documentsFromToday])
    }
    if(response?.status===404){
      // getTopFive()
      console.log('top five error',response)
    }

    console.log(response,'repsonse from getTopFive')
    console.log(topFive,'topfive useState')
  }
 
 

  useEffect(()=>{
  
    getTopFive();
  },[])
  return (
    <div className='content-container'>
      <h2 className='
      text-center'>Top Five Sales</h2>
    <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col">Sale Id:</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Sale Amount</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
  {
      topFive.map((document,index)=>{
        // ! index is 0 that's why we add 1 to keep the information sensible
        return <tr key={index + 1}>
      <th scope="row">{index + 1}</th>
      <td>{document.product_name}</td>
      <td>{document.quantity}</td>
      <td>${document.amount}</td>
    </tr>
      })
    }
    
  
    
  </tbody>
</table>
    </div>
  )
}

export default Top5Sales