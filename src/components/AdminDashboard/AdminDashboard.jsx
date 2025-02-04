import React , {useState , useEffect} from "react";
import { useAuth } from "../AuthPage/AuthContext";
import { OutlinedInput , Button , FormControl ,  InputAdornment , Typography , Box } from "@mui/material";
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import { TextareaAutosize } from '@mui/base';
import "./admin.css"
import Inventory2Icon from '@mui/icons-material/Inventory2';




const AdminDashboard = ()=>{

    const [products , setProducts] = useState([]);
    const [editingProduct , setEditingProduct] = useState(null);
    const [newProducts , setNewProducts] = useState({
        name : '',
        description : '',
        price : '',
        imageURL : ''
    })
    const {user , logout} = useAuth();



    useEffect(()=>{
     fetchProducts()
    },[])


    const fetchProducts = async()=>{

        try{
            const response = await fetch('http://localhost:5001/api/products')
            const data = await response.json();
            setProducts(data);
        }catch(err){
            console.error("Error fetching the products",err)
        }

    }

    const handleEditProduct  = (product)=>{
        setEditingProduct(product);
    }

    const handleUpdateProduct = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch( `http://localhost:5001/api/products/${editingProduct.id}` , {
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body : JSON.stringify(editingProduct)
            })

            if(response.ok){
                fetchProducts();
                setEditingProduct(null)
            }else{
                console.error("Error updating the product");
            }
        }catch(err){
            console.error("Error updating the product",err)
        }
    }   

    const handleDeleteProduct  = async(id)=>{
        console.log("Product ID to delete:", id)
        if(window.confirm("Are you sure you want to delete this product")){
            try{
                const response = await fetch(`http://localhost:5001/api/products/${id}`,{
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.status)
                if(response.ok){
                    fetchProducts();
                }else{
                    console.error("Error deleting the data");
                }
            }catch(err){
                console.error("Error deleting the product",err)
            }
        }

    }


    const handleCreateProduct = async(e)=>{ 
          e.preventDefault();

          try{
            const response = await fetch(`http://localhost:5001/api/products`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body : JSON.stringify(newProducts)
            })
          if(response.ok){
              fetchProducts();
              setNewProducts({name : '' , description : '' , price : '', imageURL : ''})
          }else{
            console.error("Error creating the product ");
          }
        }catch(err){
            console.error("Error creating the product");
        }
    }

    if(!user){
     return <div>Access denied</div>
    }

    const handleChange =(e)=>{
      const {name,value} = e.target;

      setNewProducts((prevValue)=>({
        ...prevValue,
        [name] :value,
      }
      ))}



    return(
        <div className="grid">
          <form onSubmit={handleCreateProduct}>
          <Typography variant="h6"> Create a New Product  <Inventory2Icon/></Typography>
           <FormControl>
           <OutlinedInput
            name = "name"
            type = "text"
            value ={newProducts.name}
            onChange = {handleChange}
            placeholder = "Name"
            />
             </FormControl>
             <FormControl>
            <OutlinedInput
             startAdornment={
                <InputAdornment position="start">
                    <CurrencyPoundIcon/>
                </InputAdornment>
             }
            name = "price"
            type = "number"
            value = {newProducts.price}
            onChange = {handleChange}
            placeholder = "Price"
            />
             </FormControl>
             <FormControl>
            <OutlinedInput
            name = "imageURL"
            type = "text"
            value ={newProducts.imageURL}
            onChange = {handleChange}
            placeholder = "imageURL"
            />
             </FormControl>
             <FormControl>
       <TextareaAutosize
            minRows={4}
            name = "description"
            type = "text"
            value={newProducts.description}
            onChange={handleChange}
            placeholder="Description"/>
           
            <Button type="submit">
                Create Product
            </Button>
            </FormControl>
           </form>
           <div className="tablecss">
           <Typography variant="h6">Products</Typography>
  <table style={{ width: '60%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ textAlign: 'left', fontWeight: 'bold' }}>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>ImageURL</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {products.map((product)=>(
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
            <td>€{product.price}</td>
                <td><img src={product.imageURL} alt={product.name}/></td>
                <td><Button onClick={()=>handleEditProduct(product)}>Edit</Button>
                    <Button onClick={()=>handleDeleteProduct(product.id)}>Delete</Button>
                    </td>

            </tr>
        ))}
    </tbody>
    </table>
    </div>
    {editingProduct && (
        <div>
              <Typography variant="h6">Edit the Product</Typography>
            <form onSubmit={handleUpdateProduct}>
          
              <OutlinedInput
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <OutlinedInput   
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <OutlinedInput
                type="text"
                value={editingProduct.imageUrl}
                onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <TextareaAutosize
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </Button>
            </form>
        </div>
      )}
        </div>
    )

}

export default AdminDashboard;

