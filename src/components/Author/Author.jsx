import React , {useState , useEffect} from "react";
import { OutlinedInput , Button , Typography, FormControl , CircularProgress, IconButton , Stack , Pagination } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "../Products/products.css";




const Author =()=>{

    const [query , setQuery] = useState('');
    const [products , setProduct] = useState([]);
    const [loading , setLoading] = useState(false);
    const [filteredProduct , setFilteredProduct] = useState([]);
    const [isDescription , setIsDescription] =useState({})
    const [page , setPage] = useState(1);
    const productPerPage = 10;

  



    const fetchProducts = async()=>{

        setLoading(true);
        try{
            const response = await fetch('http://localhost:5001/api/author')
            if(!response.ok){
               throw new Error("My products are not being fetched from the api");
            }
            const data = await response.json();
            setProduct(data);
            
      
        }catch(err){
            console.error("Error fetching the products");
      
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
       setPage(1);
       fetchProducts();
    },[]);


    useEffect(()=>{

      const startIndex = (page - 1) * productPerPage;
      const endIndex = startIndex + productPerPage;
      setFilteredProduct(products.slice(startIndex , endIndex))
    },[products , page])



    const handleFilteredProduct = (e)=>{
      e.preventDefault();
      if(query.trim === ""){
        setFilteredProduct(products);            
      }else{
        const filtered = 
        products.filter((product)=>
          product.name.toLowerCase().includes(query.toLowerCase()))
        setFilteredProduct(filtered);
      }
      
    }
     
    const clearFilteredProduct = ()=>{
         setFilteredProduct(products); 
    
    } 

  
    const handlePaginated = (event ,value)=>{
      setPage(value);
    }

    const descriptionVisible = (id)=>{

        setIsDescription((prevValue)=>({
          ...prevValue,
          [id] : !prevValue[id]
        }
        ))
    }

   

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
            <div className="formhandle">
           <form onSubmit={handleFilteredProduct}>
           <Typography variant="h6">Author</Typography>
           <FormControl>
           <OutlinedInput
           name="name"
           type="text"
           value={query}
           onChange={(e)=>setQuery(e.target.value)}/>
           <Button type="submit">Search</Button>
           <Button onClick={clearFilteredProduct}>Clear Search</Button>
           </FormControl>
           </form>
           <div>
            {products.length > 0 &&
            <Stack
            spacing={2}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
             count={Math.ceil(products.length / productPerPage)}
             page={page}
             onChange={handlePaginated}
             color="primary"
            />
            </Stack>            
            }
           </div>

           </div>
           <div className="footy-card">
          {filteredProduct.length > 0 ?( filteredProduct.map((pro)=>(
            <div className="card" key={pro.id}>
        <p>{pro.name}</p>
        <p>€{pro.famousbooks}</p>
        <IconButton onClick={()=>descriptionVisible(pro.id)}>
        {isDescription[pro.id] ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
        </IconButton>
        <p>{isDescription[pro.id] && pro.description}</p>
              </div>
           ))) : (<Typography>No products found</Typography>)}
          </div>
           </div>



          )

        }



export default Author;