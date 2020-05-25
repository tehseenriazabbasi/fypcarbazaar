import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {remove} from "./apiUser";
import {signout} from "../auth";
import {Redirect} from "react-router-dom";

class DeleteUser extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }
    deleteAccount = () =>{
        const token = isAuthenticated().token;
        const userId = this.props.userId;

        remove(userId, token)
            .then(data=> {
                if(data.error){
                    console.log(data.error);
                }
                else{
                    signout(()=>{
                        console.log("Deleteddddd!")
                    })
                    this.setState({redirect: true});
                }
            })
    }

    deleteConfirm = () => {
        let ans = window.confirm("Are you sure you want to delete your account?")
        if(ans){
            this.deleteAccount();
        }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"}/>
        }
        return (
            <button  className="btn btn-raised btn-danger" onClick={this.deleteConfirm}>
                Delete Profile
            </button>
        );
    }
}

export default DeleteUser;