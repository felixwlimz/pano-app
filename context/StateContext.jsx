'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext()

export const StateContext = ({ children }) => {

   const [showCart, setShowCart] = useState(false)
   const [cartItems, setCartItems] = useState([])
   const [totalPrice, setTotalPrice] = useState(0)
   const [totalQuantities, setTotalQuantities] = useState(0)
   const [qty, setQty] = useState(1)

   let foundProduct;

   const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find(item => item._id === product.id)
      setTotalPrice(prevTotal => prevTotal + product.price * quantity)
      setTotalQuantities(prevTotal => prevTotal + product.quantity)

      if (checkProductInCart) {

         const updatedCartItems = cartItems.map(cartProduct => {
            if (cartProduct._id === product._id) return {
               ...cartProduct,
               quantity: cartProduct.quantity + quantity
            }
         })

         setCartItems(updatedCartItems)
      } else {
         product.quantity = quantity
         setCartItems([...cartItems, { ...product }])
      }
      toast.success(`${qty} ${product.name} added to cart`)

   }

   const toggleCartItemQuanitity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)

      if (value === 'inc') {
         const updatedData = cartItems.map(item => (item._id === id) ? {
            ...item, quantity: item.quantity + 1
         } : item)
         setCartItems(updatedData);
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
         setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            const updatedData = cartItems.map(item => (item._id === id) ? {
               ...item, quantity: item.quantity - 1
            } : item)
            setCartItems(updatedData);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
         }
      }
   }

   const onRemove = (product) => {
      foundProduct = cartItems.find(item => item._id === product._id)
      const newCartItems = cartItems.filter(item => item._id !== product._id)

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
      setCartItems(newCartItems)
   }


   const incQty = () => setQty(prevQty => prevQty + 1);
   const decQty = () => setQty(prevQty => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
   })






   return (
      <Context.Provider value={{
         showCart,
         setShowCart,
         setCartItems,
         setTotalPrice,
         setTotalQuantities,
         cartItems,
         totalPrice,
         totalQuantities,
         qty,
         incQty,
         decQty,
         onAdd,
         toggleCartItemQuanitity,
         onRemove
      }}>
         {children}
      </Context.Provider>
   )

}

export const useStateContext = () => useContext(Context)