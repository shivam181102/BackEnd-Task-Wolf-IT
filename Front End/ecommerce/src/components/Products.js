import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'

function Products({setrender,render}) {
    const [data, setdata] = useState([])
   
      useEffect(() => {
        async function getData() {
            
        
        try {
            
            const response = await axios.get(`http://localhost:8080/allproducts`);
            if (response.status === 200) {
              setdata(response.data)
              setrender(!render)
            }
          } catch (error) {
            alert(error.message);
          }}
          getData();
      }, [])

  return (
    <div className='d-flex justify-content-between my-5 container'>
        {data?.map((data)=><Cards itemName={data.pName} price = {data.price} setrender={setrender} render={render} />)}
    </div>
  )
}

export default Products