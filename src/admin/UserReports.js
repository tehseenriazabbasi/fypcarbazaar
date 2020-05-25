import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {getReportedUsers, getUserReports} from "./apiReport";
import DisableUser from "./DisableUser";
import EnableUser from "./EnableUser";
import {Link, Redirect} from "react-router-dom";

class UserReports extends Component {
    state = {
        redirectToHome: false,
        users :[],
        reports: [],
        error: false,
        usercount: 10

    };

    handleChange = (name) => event => {

        this.setState({ [name]: event.target.value });
    };
    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }

         const token = isAuthenticated().token;
         getReportedUsers(token).then(data =>{
             if(data.error){
                 this.setState({error: data.error});
             }
             else{
                 this.setState({users : data});
             }
         });

            getUserReports(token).then(data =>{
                if(data.error){
                    this.setState({error: data.error});
                }
                else{
                    this.setState({reports : data});
                }
            })
    }
    renderusers= (users) => (

        <div className={"card"} style={{
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
            <div className={"card-body"}>
                <div style={{display: "inline-flex"}}>
                    <h6 className="card-title">Reported Users</h6>
                    <div className={"ml-5 mb-3"}>
                        <input
                            onChange={this.handleChange("usercount")}
                            type="number" min={1}  className="form-control"
                            placeholder="Enter Record Count"/>
                    </div>
                </div>

                <table className={"table table-inverse"}>
                    <thead>
                    <tr>
                        <th scope="col"><b>User Name</b></th>
                        <th scope="col"> <b>User Email</b> </th>
                        <th scope="col"> <b>Contact</b> </th>
                        <th scope="col"><b>Reported For</b></th>
                        <th scope="col"><b>Status</b></th>
                        <th scope="col"><b>View</b></th>
                        <th scope="col"><b>Edit</b></th>

                    </tr>
                    </thead>
                    <tbody>
                    {users.slice(0, this.state.usercount).map((user,i)=>(
                        <tr scope="row"  key={i}>

                            <td >
                                <Link to={`/user/${user._id}`} className="">{user.name}</Link>
                            </td>
                            <td > {user.email}</td>
                            <td > {user.phone}</td>
                            <td > Fake account</td>
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
            <div className={"container mt-2"}>
                {this.renderusers(this.state.users)}
            </div>
        );
    }
}

export default UserReports;