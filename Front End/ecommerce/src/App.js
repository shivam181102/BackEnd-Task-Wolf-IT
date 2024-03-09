// import logo from './logo.svg';
// import './App.css';
// import Cards from './components/Cards';
import { useState } from 'react';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
// import NewCard from './components/NewCard';
import Products from './components/Products';

function App() {
  const [render, setrender] = useState(true)
  return (
    <div>
    <Navbar />
    <Products setrender={setrender} render={render}/>
    <Cart render= {render}/>
    </div>
  );
}

export default App;
