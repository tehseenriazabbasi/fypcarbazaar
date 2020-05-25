import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import userReports from "../images/userReports.png";
import Posts from "../Post/Posts";
import Users from "../user/Users";
import {list} from "../user/apiUser";
import { UserSearch} from "./apiReport";

class UserManagement extends Component {
    state = {
        redirectToHome: false,
        users: [],
        usercount: 10

    };

    handleUserSearch = (name) => event => {
        const value = event.target.value;

        this.setState({ [name]: event.target.value });
        const token = isAuthenticated().token;
        UserSearch(token, value).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({users : data});
            }
        });

    };

    handleChange = (name) => event => {

        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
        list().then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({users: data});
            }
        });
    }


    renderusers= (users) => (

        <div className={"card"} style={{
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
            <div className={"card-body"}>
                <div style={{display: "inline-flex"}}>
                    <h6 className="card-title">Total Users</h6>
                    <div className={"ml-5 mb-3"}>
                    <input
                        onChange={this.handleChange("usercount")}
                        type="number" min={1}  className="form-control"
                        placeholder="Enter Record Count"/>
                </div>

                    <div className={"ml-5"}>
                        <input
                            onChange={this.handleUserSearch("search")}
                            type="text"  className="form-control"
                            placeholder="search"/>
                    </div>
                </div>


                <table className={"table table-inverse"}>
                    <thead>
                    <tr>
                        <th scope="col"><b>User Name</b></th>
                        <th scope="col"> <b>User Email</b> </th>
                        <th scope="col"> <b>Created</b> </th>
                        <th scope="col"><b>Status</b></th>
                        <th scope="col"><b>View</b></th>
                        <th scope="col"><b>Edit</b></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.slice(0,this.state.usercount).map((user,i)=>(
                        <tr scope="row"  key={i}>

                            <td >
                                <Link to={`/user/${user._id}`} className="">{user.name}</Link>
                            </td>
                            <td > {user.email}</td>
                            <td > {user.created}</td>
                            <td>
                                {user.disabled && (<i style={{'color': 'Red'}} className="fa fa-ban fa-2x ml-2"></i>)}

                                {!user.disabled && (<i  style={{'color': 'Green'}} className="fa fa-check-circle ml-2 fa-2x"></i>)}
                            </td>

                            <td>
                                <Link to={`/profile_details/${user._id}`}>View</Link>
                            </td>
                            <td>
                                <Link to={`/u/edit/${user._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className={"container mt-2"}>
                    {this.renderusers(this.state.users)}
                </div>
            </div>
        );
    }
}

export default UserManagement;