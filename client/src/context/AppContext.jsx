import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/assets'
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [isSeller, setIsSeller] = useState(false)
    const [user, setUser] = useState(true);
    const [products, setProducts] = useState([])
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [cartItems, setCartItems] = useState({});
    

    // fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    useEffect(() => {
        fetchProducts();
    },[])

    // add product to cart
    const addTocart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }


    // updated cart
    const updateCartItem = (itemId, quantity) => {
        let cardData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cardData)
        toast.success("Cart Updated");
    }

    // remove product from cart
    const removeFromCart = (itemId) => {
        let cardData = structuredClone(cartItems);
        if(cardData[itemId]){
            cardData[itemId] -= 1;
            if(cardData[itemId] === 0){
                delete cardData[itemId];
            }
        }
        toast.success("Removed from cart");
        setCartItems(cardData);
    }
    
    const value = {navigate,cartItems,  user, addTocart, updateCartItem, removeFromCart, setUser, currency, setShowUserLogin, showUserLogin, isSeller, setIsSeller, products, setProducts }

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext)
}

