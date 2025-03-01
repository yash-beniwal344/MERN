
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Addproduct from './component/Addproduct';

import Login from './component/Login';
import Private from './component/Private';
import Signup from './component/Signup';
import Updateproduct from './component/Updateproduct';
import ProductList from './component/ProductList';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Navbar/>
      <Routes>

         <Route element={<Private/>}>
          <Route path='/product' element={<ProductList/>}/>
          <Route path='/add' element={<Addproduct/>}/>
          <Route path='/update/:id' element={<Updateproduct/>}/>
          <Route path='/logout' element={<h1>Logout</h1>}/>
          <Route path='/profile' element={<h1>Profile</h1>}/>
        </Route> 

        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
         
     </BrowserRouter>
     
    </div>
  );
}

export default App;
