import React, {Component} from 'react';
import '../master/master.css'
import axios from "axios";
import { Link,  Navigate,  useNavigate } from "react-router-dom";


export default class Signup extends Component{
    state = {
        form:{
            password: '',
            username: '',
            email: '',
            roles:["moderator", "user"],
            isEdit: false
        },
        btnName:"Sign Up",
        btnClass: "ui primary button submit-button"
    }
    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
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
      let res = await axios.post("http://localhost:8080/api/auth/signup", {
            username:this.state.form.username,
            password:this.state.form.password,
            email:this.state.form.email,
            roles:this.state.form.roles
      });
      if (res.status === 200) {
        console.log('successfull data', res.data)
        localStorage.setItem('token', res.data.token);
        console.log('token   :',localStorage.getItem('token'))

         this.clearFormFields();
            this.setState({
                btnName:"Log In",
                    btnClass: "ui primary button submit-button"

            });
             return <Navigate replace to="/dashboard" />;
        
      } else {
        console.log('something error');
      }
    } catch (err) {
      console.log(err);
    }
  };

    clearFormFields = ()=>{
        this.setState({
            form:{password:"",email:"",roles:[''], username:"", isEdit: false}

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
        if(document.getElementsByName("email")[0].value === ''){
            alert("Enter email");
            return false;
        }
       
    };
    
    render() {
        
        return(
           
                <form className="ui form">
                    <div className="fields">
                        <div className="four wide field">
                            <label>User Name </label>
                            <input
                            type="text"
                            name="username"
                            placeholder="muhit1296"
                            onChange={this.handleChange}
                            value={this.state.form.username}
                            
                            />
                            
                        </div>
                        <div className="four wide field">
                            <label>User Email </label>
                            <input
                            type="email"
                            name="email"
                            placeholder="muhit@gmail.com"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                            
                            />
                            
                        </div>
                        <div className="four wide field">
                            <label>Password </label>
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