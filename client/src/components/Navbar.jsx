import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from '../assets/assets'
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {user, setUser ,setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useAppContext();

  const Logout = async () => {
    setUser(null);
    navigate('/')
  }

  useEffect(() => {
    if(searchQuery.lenght > 0){
      navigate('/products');
    }
  },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img
          className="h-9"
          src={assets.logo}
          alt="Logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Product</NavLink>
        <NavLink to='/'>Contact</NavLink>

      <div className="hiden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
        <input onChange={(e)=> setSearchQuery(e.target.value)} type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" placeholder="Search products"/>
        <img src={assets.search_icon} className="w-4 h-4" alt="search" />
      </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>

       { !user ? ( <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
          Login
        </button> )
        :
        (
          <div className="relative group"> 
           <img src={assets.profile_icon} className="w-10"  alt="" />
           <ul className="hidden group-hover:block absolute top-10 right-0 bg-white
            shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
             <li onClick={() => navigate("my-orders")} className="p-1.5 pl-3 hover:bg primary/10 cursor-pointer">My Orders</li>
             <li onClick={Logout} className="p-1.5 pl-3 hover:bg primary/10 cursor-pointer">Logout</li>
           </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>
        <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className=""
      >
        <img src={assets.menu_icon} alt="menu"  />
      </button>
      </div>

       

      {/* Mobile Menu */}
     { open && (
        <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-5 text-sm md:hidden z-50`}
        aria-hidden={!open}
      >
        <NavLink onClick={() => setOpen(false)} to='/' className="block w-full py-2 hover:text-primary-dull">Home</NavLink>
        <NavLink onClick={() => setOpen(false)} to='/products' className="block w-full py-2 hover:text-primary-dull">All Product</NavLink>
        { user && 
         <NavLink onClick={() => setOpen(false)} to='/' className="block w-full py-2 hover:text-primary-dull">My Orders</NavLink>
        }
          <NavLink onClick={() => setOpen(false)} to='/' className="block w-full py-2 hover:text-primary-dull">Contact</NavLink>
        
         { !user ? (
            <button onClick={() => {
                setOpen(false) ;
                setShowUserLogin(true)
            }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full">
            Login
          </button>
         ) :  (
            <button onClick={Logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full">
          Logout
        </button>
         )}
          
      </div> ) }
    </nav>
  );
};

export default Navbar;