import React,  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {enablePost, warnUser} from "./apiReport";
import {isAuthenticated} from "../auth";

class WarnUser extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }


    warn = () =>{
        const postname = this.props.postname;
        const email = this.props.email;
        console.log(postname);
        console.log(email);
        warnUser(email, postname)
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
            return <Redirect to={"/postReports"}/>
        }
        return (

            <div>
                <div
                    className="alert alert-danger"
                    style={{ display: this.state.redirect ? "" : "none" }}
                >
                    Users Warned!
                </div>
                <div>
                    <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-primary btn-lg" onClick={this.warn}>
                        Warn User
                    </button>
                </div>

            </div>

        );
    }
}

export default WarnUser;