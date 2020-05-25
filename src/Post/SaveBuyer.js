import React from "react";
import  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from "../auth";
import {saveBuyer} from "./apiPost";

class saveBuyerPost extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            userId: "",
            redirect: false
        };
    }




    componentDidMount() {
        const postId= this.props.match.params.postId;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        this.setState({userId: userId});
        this.postSave(userId, postId, token);
    }

    postSave = (userId, postId, token) =>{
        saveBuyer(userId, postId, token).then((data)=>{
            if(data.error){
                console.log("error in saving post");
                this.setState({error: "error in saving post"});
            }
            else{
                this.setState({error: "saved post successfully"})
                this.setState({redirect: true});
            }
        })
    };

    render() {

        if(this.state.redirect){
            return <Redirect to={`/user/${this.state.userId}`} />
        }

        return (
            <div>
                <div
                    className="alert alert-danger"
                    style={{ display: this.state.error ? "" : "none" }}
                >
                    {this.state.error}
                </div>
            </div>
        );
    }
}



export default saveBuyerPost;
