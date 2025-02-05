


import React , {useState , useEffect} from "react";
import { OutlinedInput , Button , FormControl ,  InputAdornment , Typography , Box } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import "./admin.css"
import Inventory2Icon from '@mui/icons-material/Inventory2';




const AdminAuthor = ()=>{

    const [products , setProducts] = useState([]);
    const [editingProduct , setEditingProduct] = useState(null);
    const [newProducts , setNewProducts] = useState({
        name : '',
        description : '',
        famousbooks : ''
    })
    



    useEffect(()=>{
     fetchProducts()
    },[])


    const fetchProducts = async()=>{

        try{
            const response = await fetch('http://localhost:5001/api/author')
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
            const response = await fetch( `http://localhost:5001/api/author/${editingProduct.id}` , {
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
                const response = await fetch(`http://localhost:5001/api/author/${id}`,{
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
            const response = await fetch(`http://localhost:5001/api/author`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body : JSON.stringify(newProducts)
            })
          if(response.ok){
              fetchProducts();
              setNewProducts({name : '' , description : '' , famousbooks :''})
          }else{
            console.error("Error creating the product ");
          }
        }catch(err){
            console.error("Error creating the product");
        }
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
          <Typography variant="h6"> Create a New Author <Inventory2Icon/></Typography>
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
            name = "famousbooks"
            type = "text"
            value = {newProducts.famousbooks}
            onChange = {handleChange}
            placeholder = "Famous Books"
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
           <Typography variant="h6">Authors</Typography>
  <table style={{ width: '60%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ textAlign: 'left', fontWeight: 'bold' }}>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Famous Books</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {products.map((product)=>(
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.famousbooks    }</td>
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
                type="text"
                value={editingProduct.famousbooks}
                onChange={(e) => setEditingProduct({ ...editingProduct, famousbooks: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
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

export default AdminAuthor;



