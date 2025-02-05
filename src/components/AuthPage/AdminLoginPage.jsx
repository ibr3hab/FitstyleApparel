import React , {useState} from "react";
import { OutlinedInput , Button , FormControl , InputAdornment , Box , Typography, IconButton} from "@mui/material";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import "../AuthPage/auth.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const AdminLoginPage = ()=>{
        const [email , setEmail] = useState('');
        const [password , setPassword] = useState('');
        const history = useNavigate();
        const [error , setError] = useState(null);
        const [showPassword , setShowPassword] = useState(false);
        const {login} = useAuth();
        


        const handleSubmit = async(e)=>{

            e.preventDefault();
            setError('')
            try{
                const success = await login(email , password);
                if(success){
                    history('/admin-dashboard') 
                } 
                else{
                    history('/admin')
                }
            }catch(err){
                console.error("Error fetching the login creditials",err);
                setError("Error");
            }
        }



        return(
             <div className="auth">
                         <Box sx={{display : 'flex' , alignItems : 'center'}}>
                                
                              <img  
                              src="/public/Fitstylelogoenh.jpg"
                              alt="logo"
                              style={{ height: '50px', width: '45px' }}/>
                             
                
                                 <Typography variant="h6">
                                  Bookinder
                                 </Typography>    
                                </Box>
                  <Typography variant="h6">Admin Dashboard</Typography>
                  {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
         
            <div className="form">  
            <FormControl>
            <OutlinedInput
            startAdornment={
                <InputAdornment position="start">
                    <EmailIcon/>
                </InputAdornment>
            }
            id="email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="input"
            required/>
              </FormControl>
            
            <FormControl>
            <OutlinedInput
            startAdornment={
                <InputAdornment position="start">
                    <PasswordIcon/>
                </InputAdornment>
            }

            endAdornment={
                <InputAdornment position="end">
                    <IconButton value={showPassword}
                    onClick={()=>setShowPassword(!showPassword)}
                    >
                    <VisibilityOutlinedIcon
                    />
                    </IconButton>
                </InputAdornment>
            }
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            required    
            />
             </FormControl>
            <Button type="submit">Login</Button> 
            </div>
        
        </form>
        </div>
        )
}

export default AdminLoginPage;