import React, {Component} from 'react';
import DisableUser from "./DisableUser"
import EnableUser from "./EnableUser"
import {isAuthenticated} from "../auth";
import {read} from "../user/apiUser"
class ProfileDetail extends Component {

    constructor(){
        super();
        this.state = {
            user:{},
            redirectToHome: false
        }

    }
    componentDidMount() {

        const token = isAuthenticated().token;
        const userid = this.props.match.params.userId;
        read(userid, token)
            .then(data => {
                if(data.error){
                    console.log("erorr here");
                    this.setState({redirectToSignin: true});
                }
                else{

                    console.log(data);
                    this.setState({user: data});

                }
            });
    }

    render() {
        const {user} = this.state;
        return (
            <div className={"container mt-2"}>
                <h4> {user.name} </h4>
                <div className={"row"}>
                    <div className={"col-md-8"}>
                        <div className={"card"} style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                            <h5 className={"card-title ml-3 mt-3"}> <i className="fa fa-user"></i> Details</h5>
                            <hr/>
                            <div className={"card-body"}>
                                <p className={"m-0"}><b>Full Name</b></p>
                                <p>{user.name}</p>

                                <p className={"m-0"}><b>Email</b></p>
                                <p>{user.email}</p>

                                <p className={"m-0"}><b>Cell Number</b></p>
                                <p>{user.phone}</p>

                                <p className={"m-0"}><b>Gender</b></p>
                                <p>Male</p>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-4"}>
                        <div className={"card"} style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)", padding: '10px'}}>
                            <h5 className={"card-title ml-3 mt-3"}> <i className="fa fa-cog"></i> Actions</h5>
                            <hr/>
                            <div className={"card-body"}>
                                <p style={{'font-size': '25px', 'font-weight' : '400', 'text-align': 'center'}}>Report Status: <b> Pending</b></p>
                            </div>
                            {user.disabled && (<EnableUser user_id = {user._id}/>)}

                            {!user.disabled && (<DisableUser user_id ={user._id}/>)}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDetail;