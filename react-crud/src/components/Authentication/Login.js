import React, {Component} from 'react';
import '../master/master.css'
import axios from "axios";
import { Navigate, useRouteLoaderData } from "react-router-dom";
export default class Login extends Component{

    state = {
        form:{
            password: '',
            username: '',
            isEdit: false
        },
        btnName:"Log In",
        btnClass: "ui primary button submit-button",
        loggedInUser : localStorage.getItem("token")
    }
    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
    refreshPage() {
         window.location.reload(false);
        }
   
   
    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            this.setState({
                form: { ...this.props.customer , isEdit: true },
                btnName:"Update",
                btnClass: "ui orange button submit-button"

            });
        }

    }
    handleChange = event => {
        const {name, value} = event.target;
        let form = this.state.form;
        form[name]=value;
        this.setState({form});
    
    };
    
    onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post("http://localhost:8080/api/auth/signin", {
            username:this.state.form.username,
            password:this.state.form.password
      });
      if (res.status === 200) {
        console.log('successfull data', res.data)
        this.state.loggedInUser = localStorage.setItem('token', res.data.token);
        console.log('token   :',localStorage.getItem('token'))
         this.clearFormFields();
            this.setState({
                btnName:"Log In",
                    btnClass: "ui primary button submit-button"
            }); 
            this.refreshPage();
      } else {
        console.log('something error');
      }
    } catch (err) {
      console.log(err);
    }
  };

    clearFormFields = ()=>{
        this.setState({
            form:{password:"", username:"", isEdit: false}

        });
        document.querySelector(".form").reset();
    }
    formValidation = () => {
    
        if(document.getElementsByName("password")[0].value === ''){
            alert("Enter Password");
            return false;
        }
        if(document.getElementsByName("username")[0].value === ''){
            alert("Enter username");
            return false;
        }
       
    };
    
    render() {
        if (this.state.loggedInUser) {
            return <Navigate replace to="/dashboard" />;
        }
        else{

        return(
           
                <form className="ui form">
                    <div className="fields">
                        <div className="four wide field">
                            <label>User Name</label>
                            <input
                            type="text"
                            name="username"
                            placeholder="muhit1296"
                            onChange={this.handleChange}
                            value={this.state.form.username}
                            
                            />
                            
                        </div>
                        <div className="four wide field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={this.state.form.password}

                            />
                        </div>
                       
                        <div className="four wide field">
                            <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                        </div>

                        
                    </div>
                    
                </form>
           

        );
        }
         
    }
}