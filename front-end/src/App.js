import './App.css';
import Nav from "./Components/Nav";
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import PrivateComponent from './Components/PrivateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={ <PrivateComponent /> } >
          <Route path='/' element={ <h1> Product Component </h1> } />
          <Route path='/add' element={ <h1> Add Component </h1> } />
          <Route path='/update' element={ <h1> Update Component </h1> } />
          <Route path='/LogOut' element={ <h1> LogOur Component </h1> } />
          <Route path='/Profile' element={ <h1> Profile Component </h1> } />
          </Route>
          <Route path='/signup' element={ <SignUp /> } />
        </Routes>
        <h1> E - Com DashBaord </h1>
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}

export default App;
