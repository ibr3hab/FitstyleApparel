import HomePage from "./components/HomePage.jsx/Homepage";
import LoginRegistration from "./components/AuthPage/LoginRegsitrationPage";
import { AuthProvider } from "./components/AuthPage/AuthContext";
import { Route , Routes , useLocation} from "react-router-dom";
import AdminLoginPage from "./components/AuthPage/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard/admindashboard"
import Header from "./components/Header/Header";
import HeaderAdmin from "./components/Header/HeaderAdmin";
import Products from "./components/Products/Products";
import { CartProvider } from "./Cart/CartContext";
import Cart from "./Cart/Cart";
import UserProfile from "./components/UserProfile/userProfile";


function App() {

  const location = useLocation();

 const MainHeader  = ()=>{
  if(location.pathname === '/admin-dashboard'){
    return <HeaderAdmin/>
  }else if (location.pathname === '/' || location.pathname === '/admin'){
    return null;
  }else{
    return <Header/>
  }
}


  return(
    <CartProvider>
    <AuthProvider>
    <div>
     <MainHeader/>
   <Routes>
   <Route path="/" element={<LoginRegistration/>}/>
   <Route path="/home" element={<HomePage/>}/>
   <Route path="/admin" element={<AdminLoginPage/>}/>
   <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
   <Route path="/products" element={<Products/>}/>
   <Route path="/cart" element={<Cart/>}/>
   <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
    </div>
    </AuthProvider>
    </CartProvider>
  )
}

export default App
