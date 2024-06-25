import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const NavBar = () => {
//   const [user,setUser] = useState(null)
  const {user, logout } = useAuth()
  console.log("user navbar",user)
  const [roleRequired,setRoleRequired]=useState(true)



  const checkRoles =()=>{
    // let checkrole=true
    for (let role of user.roles){
      console.log("checkRoles",role)
      if (role === "customer"){
        return false
      }
      else if(role=== "admin" || role==="superadmin"){
        return true
      }

    }
  }
  console.log("role,user",user && checkRoles())

// const logout =()=>{

// }
  return (
    // <h1>qwertyuytrdrftyuiuytrftyuiuytyuiu</h1>
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className='mr-4'>
             Home
          </Link>
          <Link to="/products" className="mr-4">
                Products
            </Link>
          {user && checkRoles() && (
            <>
              <Link to="/products/create" className="mr-4">
                Create Product
              </Link>
            </>
          )}
          <Link to="/orders" className="mr-4">
            Orders
          </Link>
          {user && (
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
          )}
        </div>
        <div>
          {user ? (
            <button onClick={logout} className="bg-red-500 p-2 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
