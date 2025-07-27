import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/assets'
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [isSeller, setIsSeller] = useState(false)
    const [user, setUser] = useState(true);
    const [products, setProducts] = useState([])
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    

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


    // Get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        } 
        return totalCount;
    }

    // Get cart total price
    const getCartTotalPrice = () => {
        let totalPrice = 0;
        for(const items in cartItems){
            const itemInfo = products.find((product) => product._id === items);
            if(cartItems[items] > 0){
                totalPrice += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalPrice * 100) / 100; // rounding to 2 decimal places
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
    
    const value = {navigate, cartItems,  user, addTocart, updateCartItem, removeFromCart, setUser, currency, setShowUserLogin, showUserLogin, isSeller, setIsSeller, products, setProducts, searchQuery, setSearchQuery, getCartTotalPrice, getCartCount }

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext)
}

