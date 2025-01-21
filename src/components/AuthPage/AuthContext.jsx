import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         fetch('http://localhost:5000/api/auth/validate', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}` //The useEffect is used to validate the token and check if it is correct passed on //
                    
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.valid) {
    //                 setUser(data.user);
    //             } else {
    //                 localStorage.removeItem('token');
    //             }
    //         })
    //         .catch(err => console.error("Error fetching the data", err));
    //     }
    // }, []);

        useEffect(()=>{
            const token = localStorage.getItem('token');
            if(token){
                fetch('http://localhost:5000/api/auth/validate',{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.valid){
                        setUser(data.user)
                    }else{
                        localStorage.removeItem('token');
                    }
                })
                .catch(err=> console.error("Error fetching the datils",err))
            }
        },[]);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) 
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login Error:", err);
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }) 
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error Registering:", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
