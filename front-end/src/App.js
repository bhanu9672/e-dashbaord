import './App.css';
import Nav from "./Components/Nav";
import SignUp from './Components/SignUp';
import FooterSec from './Components/FooterSec';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductLists from "./Components/ProductLists";
import UpdateProduct from './Components/UpdateProduct';
import Store from './Components/Store';
import SingleProduct from './Components/SingleProduct';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path='/' element={<ProductLists />} />
            <Route path='/store' element={ <Store /> } />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <FooterSec />
    </>
  );
}

export default App;