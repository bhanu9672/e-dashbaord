import './App.css';
import Nav from "./Components/Nav";
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductLists from "./Components/ProductLists";
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path='/' element={<ProductLists />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/LogOut' element={<h1> LogOur Component </h1>} />
            <Route path='/Profile' element={<h1> Profile Component </h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
