import React , {useEffect , useState} from "react";
import {Typography , IconButton , Button  , CircularProgress    } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from "../../Cart/CartContext";
import "./home.css";
import { useDesc } from "../Products/Description&CC";


 
const HomePage = ()=>{

     
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(false);
    const {addToCart} = useCart();
    const {isDescription , count , countCart , descriptionVisible } = useDesc(); 



    const fetchProducts  = async ()=>{
       setLoading(true)


       try{
        const response = await fetch('/api/products')
        if(!response.ok){
            throw new Error("The products cannot be fetched");
        }
        const data = await response.json();
        const shuffledproducts = data.sort(()=>0.5 - Math.random());
        const randomProducts = shuffledproducts.slice(0,10);
        setProducts(randomProducts);
       }catch(err){
        console.error("Error getting the data" , err);
       }finally{
        setLoading(false);
       }
    }


    useEffect(()=>{
        fetchProducts();
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

     return(

  
       <div>
       <div>
       <img src="../public/39218987724.jpg" alt="banner-image"  className="banner-image"/>
       </div>  
       <div className="product-card">
        <Typography variant="h5">Featured Products</Typography>
        <div className="scroll-container">
        {products.map((pro)=>(
          <div className="card" key={pro.id}>
             <img src={pro.imageURL} alt={pro.name} className="productimg"/>
      <p>{pro.name}</p>
      <p>€{pro.price}</p>
      <IconButton onClick={()=>descriptionVisible(pro.id)}>
      {isDescription[pro.id] ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
      </IconButton>
      <p>{isDescription[pro.id] && pro.description}</p>
      <Button onClick={()=>addToCart(pro.id , count[pro.id] || 1)}>Add To Cart </Button>
      <IconButton onClick={()=>countCart(pro.id)}>
       <AddShoppingCartIcon/> {count[pro.id] > 0 ? count[pro.id] :''} 
      </IconButton>
            </div>
     ))}
     </div>
     </div>
     </div>
     ) 
}

export default HomePage;