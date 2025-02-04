import React , {useState , useEffect} from "react";
import "./Cart.css";
import { useCart } from "./CartContext";
import { CircularProgress , Button , Typography , IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';



const Cart = ()=>{

    const {cart , fetchCart , deleteCart , updateCart} = useCart();
    const [loading , setLoading] = useState(false);
    const [count , setCount] = useState({});



  useEffect(()=>{
 const initialCount  = cart.reduce((sum , item)=>{  //For each item in the cart : item.productId becomes the key in the sum object and item.quantity is set as the value of it 
    sum[item.productId] = item.quantity;
    return sum},{})

    setCount(initialCount);
},[cart])

  const minusCount = (productId)=>{
    setCount((preValue)=>({
        ...preValue,
        [productId] : preValue[productId] - 1
    }))
  }

  const addCount = (productId)=>{
    setCount((preValue)=>({
        ...preValue,
        [productId] : preValue[productId] + 1
    }))
  }

    

  

    useEffect(()=>{
      
      const fetchData = async()=>{
        setLoading(true)
        try{
           await fetchCart();
        }catch(err){
            console.error("Error fetching the Cart Items")
        }finally{
            setLoading(false)
        }
        
    }
    fetchData();
    },[])  



    if (loading) {
                return (
                  <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // Full viewport height
                  }}
                >
                  <CircularProgress />
                </div>
                )
              }
   
   


              return (
                <div className="cart-container">
                  {/* Cart Items on the Right */}
                  <div className="cart-items">
                    {cart.map((product , index) => (
                      <div className="card" key={`${product.productId}-${index}`}>
                        <img src={product.imageURL} alt={product.name} />
                        <div className="content">
                          <p>{product.name}</p>
                          <p>€{product.price}</p>
                          <p>
                            <AddShoppingCartIcon /> : {count[product.productId]}
                          </p>
                        </div>
                        <div className="cart-actions">
                          <IconButton onClick={() => deleteCart(product.productId)}>
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            onClick={() =>
                              updateCart(product.productId, count[product.productId])
                            }
                          >
                            Update Cart
                          </Button>
                          <div>
                            <IconButton onClick={() => minusCount(product.productId)}>
                              <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => addCount(product.productId)}>
                              <AddIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
            
                  {/* Total Amount on the Left */}
                  <div className="cart-total">
                    <Typography variant="h5">
                      Total amount: €{" "}
                      {cart
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toLocaleString()}
                    </Typography>
                  </div>
                </div>
              );
            };
            
            export default Cart;