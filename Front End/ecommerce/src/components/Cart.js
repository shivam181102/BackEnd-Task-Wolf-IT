import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Cart({render}) {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function getData() {
            
        
        try {
            
            const response = await axios.get(`http://localhost:8080/cartDetails`);
            if (response.status === 200) {
              setdata(response.data)
            }
          } catch (error) {
            alert(error.message);
          }}
          getData();
      }, [render])


  return (
    <div className='container my-5 p-5' style={{border:"1px solid black", borderRadius:"10px",textAlign:"center"}}>
        <h1>Cart</h1>
        <h6>Products In Cart</h6>
        <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>

    {data.cartProducts?.map((data)=>{
        if (data.count) {
        return(<tr><th scope="row">{data.pName}</th>
        <td>{data.count}</td>
        <td>{data.price}</td> </tr>)
            
        }else return null
    })}
    
      
      
   
    
    
  </tbody>
</table>
    <h3>Total Price : {data.totalPrice}</h3>
    <h6>Discount Amount: {data.totalPrice - data.disCountPrice}</h6>
    <h2>Final Amount: {data.disCountPrice}</h2>
    <button type="button" class="btn btn-secondary">Secondary</button>
    </div>

  )
}

export default Cart