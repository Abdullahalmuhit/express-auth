import React, { useState } from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";


const Logout = ()=> {

    var loggedInUser = localStorage.getItem('token');
    const refreshPage = () => {
         window.location.reload(false);
        }
     
    const logout = async (e)=>{
        try {
            let res = await axios.post("http://localhost:8080/api/auth/signout");
            if (res.status === 200) {
                console.log('successfull logout', res.data)
                sessionStorage.removeItem('token');
                localStorage.clear();
                refreshPage()
                
            } else {
                console.log('something error');
            }
        } catch (err) {
        console.log(err);
        }
  
    };
    logout();

     if (!loggedInUser) {
            return <Navigate replace to="/login" />;
        }
        else{
            return <Navigate replace to="/dashboard" />;
        }

};
export default Logout;