import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import {Link, Redirect} from "react-router-dom";
import {getReportedPosts, getReportedUsers, getUserPostReports, getUserReports, totalUsers,totalPosts, activePosts, deactivePosts ,newMembers, getPendingRequests, getReportedPostsSearch, getReportedUserSearch} from "./apiReport";


import "./admin.css"

class Admin extends Component {
    state = {
        redirectToHome: false,
        users :[],
        reports: [],
        posts :[],
        post_reports: [],
        error: false,
        total_users: [],
        total_posts: [],
        total_reqs: [],
        total_active_posts: [],
        total_deactive_posts: [],
        new_members :[],
        usercount: 5,
        postcount: 5,


    };


    handleChange = (name) => event => {

        this.setState({ [name]: event.target.value });
    };

    handleSearch = (name) => event => {
        const value = event.target.value;

        this.setState({ [name]: event.target.value });
        const token = isAuthenticated().token;
        getReportedPostsSearch(token, value).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({posts : data});
            }
        });

    };

    handleUserSearch = (name) => event => {
        const value = event.target.value;

        this.setState({ [name]: event.target.value });
        const token = isAuthenticated().token;
        getReportedUserSearch(token, value).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({users : data});
            }
        });

    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }

        const token = isAuthenticated().token;
        //user methods
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
        });


        //post methods
        getReportedPosts(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({posts : data});
            }
        });

        getUserPostReports(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({post_reports : data});
            }
        })

        totalUsers(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({total_users : data});
            }
        });

        getPendingRequests(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({total_reqs : data});
            }
        });

        totalPosts(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({total_posts : data});
            }
        });

        activePosts(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({total_active_posts : data});
            }
        })

        deactivePosts(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({total_deactive_posts : data});
            }
        })

        newMembers(token).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({new_members : data});
            }
        })

    }


    renderusers= (users) => (


        <div className={"card"} style={{
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
            <div className={"card-body"}>
                <div style={{display: "inline-flex"}}>
                    <h6 className="card-title">Reported Users</h6>
                    <a  style={{'margin-left': '15px', 'color': 'deepskyblue'}} href="/userReports">View All</a>
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
                        <th scope="col"> <b>Contact</b> </th>
                        <th scope="col"><b>Reported For</b></th>
                        <th scope="col"><b>Status</b></th>
                        <th scope="col"><b>View</b></th>
                        <th scope="col"><b>Edit</b></th>


                    </tr>
                    </thead>
                    <tbody>
                    {users.slice(0,this.state.usercount).map((user,i)=>(
                        <tr scope="row"  key={i}>

                            <td >
                                <Link  style={{'color': 'deepskyblue'}} to={`/user/${user._id}`} className="">{user.name}</Link>
                            </td>
                            <td > {user.email}</td>
                            <td > {user.phone}</td>
                            <td > Fake account</td>
                            <td>
                                {user.disabled && (<i style={{'color': 'Red'}} className="fa fa-ban fa-2x ml-2"></i>)}

                                {!user.disabled && (<i  style={{'color': 'Green'}} className="fa fa-check-circle ml-2 fa-2x"></i>)}
                            </td>

                            <td>
                                <Link style={{'color': 'deepskyblue'}} to={`/profile_details/${user._id}`}>View</Link>
                            </td>
                            <td>
                                <Link style={{'color': 'deepskyblue'}} to={`/u/edit/${user._id}`}>Edit</Link>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    renderposts= (posts) => (

        <div className={"card"} style={{
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
            <div className={"card-body"}>
                <div style={{display: "inline-flex"}}>
                    <h6 className="card-title">Reported Posts</h6>
                    <a style={{'margin-left': '15px', 'color': 'deepskyblue'}} href="/postReports">View All</a>
                    <div className={"ml-5 mb-3"}>
                        <input
                            onChange={this.handleChange("postcount")}
                            type="number" min={1} className="form-control"
                            placeholder="Enter Record Count"/>
                    </div>

                    <div className={"ml-5"}>
                        <input
                            onChange={this.handleSearch("search")}
                            type="text"  className="form-control"
                            placeholder="search"/>
                    </div>

                </div>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th scope="col"><b>Title</b></th>
                        <th scope="col"><b>Reported For</b></th>
                        <th scope="col"><b>Post Owner</b></th>
                        <th scope="col"><b>Status</b></th>
                        <th scope="col"><b>View</b></th>
                        <th scope="col"><b>Edit</b></th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.slice(0,this.state.postcount).map((post,i)=>(
                        <tr scope="row"  key={i}>

                            <td >
                                <Link to={`/post/${post._id}`} style={{'color': 'deepskyblue'}} className="">{post.title}</Link>
                            </td>
                            <td > Fake post</td>
                            <td> {post.postedBy.email} </td>
                            <td>
                                {post.status == 'deactivated' && (<i style={{'color': 'Red'}} className="fa fa-ban fa-2x ml-2"></i>)}

                                {post.status == 'active' && (<i  style={{'color': 'Green'}} className="fa fa-check-circle ml-2 fa-2x"></i>)}
                            </td>
                            <td>
                                <Link to={`/post_details/${post._id}`} style={{'color': 'deepskyblue'}} >View</Link>
                            </td>

                            <td>
                                <Link to={`/post/edit/${post._id}`}style={{'color': 'deepskyblue'}} >Edit</Link>
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
                <div className="container mt-3">
                    <h3>Admin Dashboard</h3>
                    <hr/>

                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <a className="card card-post" href={"/userManagement/"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                    }}>

                                    <div className="card-img-top" style={{"background-color" : "#DC3545",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className="fa fa-users fa-4x" style={{"margin": "16px" , "color": 'black'}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>Total Users</p>
                                        <b>{this.state.total_users.map((user,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{user.users}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>
                        </div>


                        <div className={"col-md-4"}>
                            <a className="card card-post" href={"/newMembers/"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                }}>

                                    <div className="card-img-top" style={{"background-color" : "#DC3545",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className = "fa fa-user-plus fa-3x" style={{"margin": "25px", "color" : "black"}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>New Members</p>
                                        <b>{this.state.new_members.map((user,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{user.users}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>

                        </div>


                        <div className={"col-md-4"}>


                            <a className="card card-post" href={"/pendingUsers"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                }}>

                                    <div className="card-img-top" style={{"background-color" : "#DC3545",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className = "fa fa-user-plus fa-3x" style={{"margin": "25px", "color" : "black"}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>Pending Requests</p>
                                        <b>{this.state.total_reqs.map((user,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{user.users}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>

                        </div>

                    </div>

                    <div className={"row mt-2"}>
                        <div className={"col-md-4"}>
                            <a className="card card-post" href={"/adsManagement/"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                }}>

                                    <div className="card-img-top" style={{"background-color" : "#17a2b8",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className = "fa fa-clone fa-3x" style={{"margin": "25px" , "color" : 'black'}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>Total Posts</p>
                                        <b>{this.state.total_posts.map((post,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{post.posts}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>

                        </div>
                        <div className={"col-md-4"}>


                            <a className="card card-post" href={"/activePosts/"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                }}>

                                    <div className="card-img-top" style={{"background-color" : "#17a2b8",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className = "fa fa-check fa-3x" style={{"margin": "25px", "color": "black"}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>Active Posts</p>
                                        <b>{this.state.total_active_posts.map((post,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{post.posts}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>

                        </div>
                        <div className={"col-md-4"}>

                            <a className="card card-post" href={"/deactivatedPosts/"}>
                                <div style={{display: 'inherit',
                                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"
                                }}>

                                    <div className="card-img-top" style={{"background-color" : "#17a2b8",
                                        height: '100px',
                                        width: '100px',
                                        margin : '6px 0px 6px 6px',
                                        'border-radius' : '4px',
                                        "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"

                                    }}><i className="fa fa-ban fa-4x" style={{"margin": "21px", "color" : "black"}}></i> </div>
                                    <div className="card-body card-post">
                                        <p>Disabled Posts</p>
                                        <b>{this.state.total_deactive_posts.map((post,i)=>(
                                            <b scope="row"  key={i}>
                                                <b>{post.posts}</b>
                                            </b>
                                        ))}</b>
                                    </div>
                                </div>
                            </a>

                        </div>




                    </div>
                    <hr/>
                    <div className={"mt-3"}>
                        {this.renderusers(this.state.users)}
                    </div>

                    <div className={"mt-3"}>
                        {this.renderposts(this.state.posts)}
                    </div>

                </div>
            </div>
        );
    }
}

export default Admin;