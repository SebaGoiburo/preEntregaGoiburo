import { useEffect, useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children}){
   const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);

   const addToCart = (item, count) =>{
    setCart((prevCart) => {
        const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
        
        if (itemIndex !== -1) {
          // Si el producto ya está en el carrito, actualizamos la cantidad
          const updatedCart = [...prevCart];
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: updatedCart[itemIndex].quantity + count,
          };
          return updatedCart;
        } else {
          // Si el producto no está en el carrito, lo agregamos con la cantidad especificada
          return [...prevCart, { ...item, quantity: count }];
        }
      });
   }

   const removeFromCart = (productId, quantity)=>{
    setCart((prevCart) => {
        const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === productId);
        if (itemIndex !== -1) {
          const updatedCart = [...prevCart];
          const updatedItem = { ...updatedCart[itemIndex] };
  
          // Decrementar la cantidad del producto
          updatedItem.quantity -= quantity;
  
          // Si la cantidad es menor o igual a cero, eliminar el producto del carrito
          if (updatedItem.quantity <= 0) {
            updatedCart.splice(itemIndex, 1);
          } else {
            // De lo contrario, actualizar la cantidad del producto
            updatedCart[itemIndex] = updatedItem;
          }
  
          return updatedCart;
        }
        return prevCart; // Si el producto no está en el carrito, devolver el carrito sin cambios
      });
   }

   const clearCart = ()=>{
    setCart([]);
   }

   const cartTotal = cart.reduce((acc, item)=>{
    return acc + item.precio * item.quantity;
   },0).toFixed(2);

   useEffect(()=> {
    localStorage.setItem("cart", JSON.stringify(cart));
   },[cart])

   return(
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, cartTotal }}>
    {children}
    </CartContext.Provider>
   );   

}

