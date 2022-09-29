import React, {Component} from 'react';

import { Navigate } from "react-router-dom";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Logout from './Authentication/Logout';


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
                <Link to={"/logout"} className="btn btn-primary btn-sm">
                  Logout
                </Link>         
            </div>
            );

        }

            
    };

};
