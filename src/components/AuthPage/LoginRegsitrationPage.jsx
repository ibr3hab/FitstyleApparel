import React , {useState} from "react";
import { OutlinedInput , Button , FormControl , InputAdornment , Box , Typography, IconButton} from "@mui/material";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import { Person } from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';
import "../AuthPage/auth.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const LoginRegistration = ()=>{

    const [isLogin , setIsLogin] = useState(true);
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const history = useNavigate();
    const [error , setError] = useState(null);
    const {login , register} = useAuth();
    const [showPassword , setShowPassword] = useState(false);
     

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            let success;
            if(isLogin){
                success = await login(email , password);
                if(success){
                    history('/home');
                }
            }else{
                success = await register(name , email , password);
                if(success){
                    history('/');
                }
            }
            if(!success){
                setError(isLogin ? "Incorrect Username and password" : "Error trying to register");
            }
        }catch(err){
            console.error("Error trying to get to the homepage",err);
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
                      FitStyle Apparel
                     </Typography>    
                    </Box>
      <Typography variant="h6">{isLogin ? 'Login' : 'Register'}</Typography>
      {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
         
            <div className="form"> 
            {!isLogin && 
            <FormControl>
            <div><OutlinedInput
            startAdornment={
                <InputAdornment position="start">
                <Person/>
                </InputAdornment>
            }
            id="name"
            type="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="input"
            required={!isLogin}/>
            </div>
            </FormControl>
            }
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
            <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button> 
            </div>
        
        </form>
        <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </p>
      
        </div>
    )
}

export default LoginRegistration;