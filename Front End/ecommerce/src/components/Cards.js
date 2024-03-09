import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, ButtonGroup, Button } from '@mui/material';
import axios from 'axios';

const Cards = ({ itemName, price, setrender,render }) => {

    useEffect(() => {
        async function getData() {
            
        
        try {
            
            const response = await axios.get(`http://localhost:8080/cartDetails`);
            if (response.status === 200) {
                let data = response.data.cartProducts.filter((data)=>data.pName==itemName)
                setQuantity(data[0].count);
            }
          } catch (error) {
            alert(error.message);
          }}
          getData();
      }, [])

  const [quantity, setQuantity] = useState(0);

  const handleIncrement = async () => {
      try {
          
          const response = await axios.post(`http://localhost:8080/cart`,{pName:itemName});
          if (response.status === 200) {
            setrender(!render)
        }
    } catch (error) {
        alert(error.message);
    }
    setQuantity(prevQuantity => prevQuantity + 1);

  };

  const handleDecrement =async () => {
    if (quantity > 0) {
        try {
          
            const response = await axios.post(`http://localhost:8080/delcart`,{pName:itemName});
            if (response.status === 200) {
                setrender(!render)
          }
      } catch (error) {
          alert(error.message);
      }
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {itemName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Quantity: {quantity}
        </Typography>
        <ButtonGroup size="small" aria-label="quantity">
          <Button onClick={handleDecrement}>-</Button>
          <Button disabled>{quantity}</Button>
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default Cards;
