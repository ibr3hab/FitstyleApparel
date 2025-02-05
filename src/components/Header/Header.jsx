import React , {useState} from "react";
import { AppBar , Container , Toolbar , Box , IconButton , Menu , MenuItem, Typography, Button } from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { MenuOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthPage/AuthContext";
import { useNavigate } from "react-router-dom";



const Header = ()=>{

    const [anchorEl1 , setAnchorEl] = useState(null);
    const [anchorElUser , setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const {logout} = useAuth();
    
    
    const pages = ['Home' , 'Books' , 'Cart' , 'Author' ];


    const handleOpenNav = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleCloseNav = ()=>{
        setAnchorEl(null);
    }

    const handleOpenUserProfile = (event)=>{
      setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserProfile = ()=>{
      setAnchorElUser(null);
    }

    const handleLogout = ()=>{
      navigate("/"),
      logout();
    }


   return(
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar>
                <Box sx={{display : 'flex' , alignItems : 'center'}}>
                    
                <Link to="/home">
             <img
              src="/public/Fitstylelogoenh.jpg"
              alt="logo"
              style={{ marginRight: '15px', height: '50px', width: '45px' }}
             />
           </Link>

                 <Typography variant="h6">
                  Bookinder 
                 </Typography>    
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, display: { xs: 'none', md: 'flex', marginLeft :'auto'} }}>
            {pages.map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button color="inherit">{page}</Button>
              </Link>
            ))}
          </Box>
           <Box sx={{ display : { xs : 'flex' , md : 'none'} , marginLeft : 'auto'}} >
           <IconButton    onClick={handleOpenNav}  style={{color : 'inherit'}}>
            <MenuOpen/>
            </IconButton>
            <Menu
             anchorEl={anchorEl1}
             open = {Boolean(anchorEl1)}
             onClose={handleCloseNav}>
              {pages.map((page)=>(
                <MenuItem key={page} onClick={handleCloseNav}>
                    <Link to={`/${page.toLowerCase()}`} style={{color : "inherit" , textDecoration : "none"}}>
                    {page}
                    </Link>
                </MenuItem>
              ))}               
           </Menu>  
           </Box>

                <Box sx={{ ml: 2 }}>
              <IconButton color="inherit" onClick={handleOpenUserProfile}>
                <PeopleOutlineIcon />
              </IconButton>
            <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserProfile}
            >
              <MenuItem onClick={handleCloseUserProfile}>
              <Link to="/userProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
              User Profile
              </Link>
              </MenuItem>
            <MenuItem onClick={handleCloseUserProfile}><Button onClick={handleLogout}
              >logout</Button></MenuItem>
            </Menu>
          </Box>


            </Toolbar>
        </Container>
    </AppBar>
   )
}

export default Header;


