import React, {Component} from 'react';

import { Navigate } from "react-router-dom";

export default class Dashboard extends Component{

    state = {
        loggedInUser : localStorage.getItem("token")
}

    render() {
        console.log('auth token', this.state.loggedInUser)
        if (!this.state.loggedInUser) {
            return <Navigate replace to="/login" />;
        }
        else{
        return(
            <div>
                <h1>Welcome to your Dashboard</h1>
            </div>
            );

        }

            
    };

};
