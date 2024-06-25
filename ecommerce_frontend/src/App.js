import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import { AuthProvider } from './context/AuthContext';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/products/CreateProducts";
import EditProduct from "./pages/products/EditProduct";
import ProductList from "./pages/products/ProductList";
import OrderList from "./pages/orders/OrderList";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    
    <Router>
      <AuthProvider>
        <NavBar/>
        <Routes>
          {/* <Route exact path="/" element={<Home/>}/> */}
          <Route exact path="/" element={<ProductList/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<ProtectedRoute roles={["customer","admin","superadmin"]}/>} >
            <Route path="/dashboard" element={<Home/>}/>
            {/* <Route path="/profile" element={<Profile/>}/> */}
            <Route>
              <Route path="/products" element={<ProductList/>}/>
              <Route path="/products/create" element={<CreateProduct/>}/>
              <Route path="/products/edit/:id" element={<EditProduct/>}/>

            </Route>
            <Route path="/orders" element={<OrderList/>}/>
          </Route>
          {/* <ProtectedRoute path="/products/create" element={<CreateProduct/>} />
          <ProtectedRoute path="/products" component={<ProductList/>} />
          <ProtectedRoute path="/products/edit/:id" component={<CreateProduct/>} roles={["admin","superadmin"]}/> */}
        </Routes>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
