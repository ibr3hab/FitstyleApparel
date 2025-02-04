import React , {useState , useEffect , useContext, createContext } from "react";


const CartContext = createContext();

export const CartProvider = ({children})=>{

 const [cart , setCart] = useState([]);



 const fetchCart = async()=>{
    try{
    const response = await fetch('http://localhost:5001/api/cart',{
        headers :{
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(!response.ok){
        throw new Error("Not able tp fetch the cart Items");
    }

    const data = await response.json()
    setCart(data);
  }catch(err){
    console.error("Not able to fetch the products");
  }
 }


 useEffect(()=>{
   fetchCart();
 },[])


 const addToCart = async(productId , quantity)=>{
     try{
        const response = await fetch('http://localhost:5001/api/cart',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
               'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({productId , quantity})
        })
        if(!response.ok){
            throw new Error('Error adding to cart')
        }
     }catch(err){
        console.error("Error adding to the cart",err);
     }
 }
 
 const updateCart = async(productId , quantity)=>{
    try{
        const response = await fetch(`http://localhost:5001/api/cart/${productId}`,{
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
                 'Authorization' : `Bearer ${localStorage.getItem('token')}`
              },
              body : JSON.stringify({ quantity})
        })

        if(!response.ok){
            throw new Error("Error updating the cart");
        }
        fetchCart();
    }catch(err){
        console.error("Error updating the cart");
    }
 }

   
const deleteCart = async (productId)=>{
    console.log("Product Id : ",productId);
    try{
    const response = await fetch(`http://localhost:5001/api/cart/${productId}`,{
        method : "DELETE",
        headers : {
            'Content-Type' : 'application/json',
             'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })    
    if(!response.ok){
        throw new Error("Error deleting the product")
    }
       await fetchCart();
}catch(err){
    console.error("Error fetching the product")
}
}


return(
    <CartContext.Provider value={{cart, addToCart , updateCart , deleteCart, fetchCart }}>
        {children}
    </CartContext.Provider>
)
}
export   const  useCart = ()=>useContext(CartContext);