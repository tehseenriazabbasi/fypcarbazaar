import React,  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {enableUser} from "./apiReport";
import {isAuthenticated} from "../auth";

class DisableUser extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }

    enable = () =>{
        const userid = this.props.user_id;
        const token = isAuthenticated().token;
        enableUser(userid, token)
            .then(data=> {
                if(data.error){
                    console.log(data.error);
                }
                else{
                    this.setState({redirect: true});
                }
            })

    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/profile_details/"+this.props.user_id}/>
        }
        return (

            <div>
            <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-primary btn-lg" onClick={this.enable}>
                Enable User
            </button>
            </div>

        );
    }
}

export default DisableUser;