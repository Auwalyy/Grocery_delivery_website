import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { currency, addTocart, removeFromCart, cartItems } = useAppContext();

    const handleProductClick = () => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
    };

    return product && (
        <div 
            onClick={handleProductClick} 
            className="border border-primary rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full cursor-pointer"
        >
            <div className="group flex items-center justify-center px-2">
                <img 
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                    src={product.image[0]} 
                    alt="product" 
                />
            </div>
            <div className="text-primary text-sm">
                <p>{product.category}</p>
                <p className="text-primary font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img 
                            key={i} 
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                            alt="" 
                            className="md:w-3.5 w-3" 
                        />
                    ))}
                    <p>({4})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-primary md:text-sm text-xs line-through">
                            {currency}{product.price}
                        </span>
                    </p>
                    <div onClick={(e) => e.stopPropagation()} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button 
                                onClick={() => addTocart(product._id)}
                                className="flex items-center justify-center gap-1 cursor-pointer border border-primary md:w-[80px] w-[64px] h-[34px] rounded" 
                            >
                                <img src={assets.cart_icon} alt="cart_icon" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] rounded select-none">
                                <button 
                                    onClick={() => removeFromCart(product._id)} 
                                    className="cursor-pointer text-md px-2 h-full" 
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button 
                                    onClick={() => addTocart(product._id)} 
                                    className="cursor-pointer text-md px-2 h-full" 
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;