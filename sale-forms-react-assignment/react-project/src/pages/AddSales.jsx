import React, { useState } from 'react'
import './css/styles.css'
import { addSaleAxiosCall } from '../api-calls/apiCalls.js'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'




const defaultSalesValues = {
  product_name : '',
  quantity:"",
  amount:" "
}


const AddSales = () => {

  const [saleDetails,setSaleDetails] = useState(defaultSalesValues);

  const handleChange = (e)=>{
   
    setSaleDetails({...saleDetails,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate()


  const addSale = async()=>{
    const response = await addSaleAxiosCall(saleDetails)
    if(response.status===201){
      Swal.fire({
        icon:'success',
        title:response.data.msg
      })
      
      navigate('/top-five-sales')
    }
    if(response.status===401 || response.status===404){
      Swal.fire({
        icon:'error',
        title:response.data.msg
      })
    }

  }
  return (
    <div className='content-container'>
        <h2 className='
        text-center'>Add Sale Entry</h2>
    <div class="mb-3">
    <label for="product-name" class="form-label">Product</label>
    <input type="text" onChange={(e)=>handleChange(e)} name='product_name' class="form-control" id="product-name" />
  </div>
  <div class="mb-3">
    <label for="quantity" class="form-label">Quantity</label>
    <input class="form-control" onChange={(e)=>handleChange(e)} name='quantity' type='number' id="quantity"></input>
  </div>
  <div class="mb-3">
    <label for="amount" class="form-label">Amount</label>
    <input class="form-control" onChange={(e)=>handleChange(e)} name='amount' type="number" id="amount"></input>
  </div>
  <div class="mb-3">
    <button onClick={()=>addSale()} class="form-control btn btn-primary"  id="submitBtn">Add Sale</button>
  </div>
    </div>
  )
}

export default AddSales