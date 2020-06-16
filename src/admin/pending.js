import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import userReports from "../images/userReports.png";
import Posts from "../Post/Posts";
import Users from "../user/Users";
import {getPending} from "./apiReport";

class pending extends Component {
    state = {
        redirectToHome: false,
        users: [],

    };
    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
        getPending().then(data =>{
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
                <h6 className="card-title">Pending Dealer Requests</h6>

                <table className={"table table-inverse"}>
                    <thead>
                    <tr>
                        <th scope="col"><b>User Name</b></th>
                        <th scope="col"> <b>User Email</b> </th>
                        <th scope="col"> <b>Created</b> </th>
                        <th scope="col"><b>Actions</b></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user,i)=>(
                        <tr scope="row"  key={i}>

                            <td >
                                <Link to={`/user/${user._id}`} style={{'color': 'deepskyblue'}} className="">{user.name}</Link>
                            </td>
                            <td > {user.email}</td>
                            <td > {user.created}</td>
                            <td>
                                <Link to={`/dealer_details/${user._id}`} className="btn  btn-raised btn-primary btn-sm">Details</Link>
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

export default pending;