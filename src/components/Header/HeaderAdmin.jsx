import React from "react";
import { AppBar, Container, Toolbar , Box , Typography ,Button } from '@mui/material';
import { useAuth } from "../AuthPage/AuthContext";
import { useNavigate } from "react-router-dom";




const HeaderAdmin = ()=>{

const {logout} = useAuth();
const navigate = useNavigate();


const handleLogout =  ()=>{

   navigate('/admin');
   logout();
}


    return(
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar>
                <Box sx={{display : 'flex' , alignItems : 'center'}}>
             <img
              src="/public/Fitstylelogoenh.jpg"
              alt="logo"
              style={{ marginRight: '15px', height: '50px', width: '45px' }}
             />

                 <Typography variant="h6">
                  FitStyle Apparel
                
                 </Typography> 
                 </Box>
                 <Box  sx={{marginLeft : 'auto'}}>
                 
                 <Button onClick={handleLogout}
                    style={{ color : 'inherit'}}
                >Logout</Button>
                </Box>
                </Toolbar>
                </Container>
                </AppBar>
    )
}

export default HeaderAdmin;