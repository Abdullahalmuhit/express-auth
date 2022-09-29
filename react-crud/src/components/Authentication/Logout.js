import React from 'react';
import axios from "axios";

const Logout=()=>{
    const logout = async (e)=>{
        try {
            let res = await axios.post("http://localhost:8080/api/auth/signout");
            if (res.status === 200) {
                console.log('successfull logout', res.data)
                sessionStorage.removeItem('token');
                localStorage.clear();
                
            } else {
                console.log('something error');
            }
        } catch (err) {
        console.log(err);
        }
  
    };
    logout();
    
    return(
        <div>
            <h1>successfull logout</h1>
        </div>

    );

};
export default Logout;