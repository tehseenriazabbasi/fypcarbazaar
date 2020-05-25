import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import Posts from "../Post/Posts";
import { searchCarBazar, searchOlx} from "../Post/apiPost";

import { list,PostsSearch} from "./apiReport";
import User_Avatar from "../images/User_Avatar.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class AdsManagement extends Component {
    state = {
        redirectToHome: false,
        posts: [],
        search: "",
        searchResultcarbazar: [],
        searched : false,
        loading: false,
        postcount: 10
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
                this.setState({posts: data});
            }
        });

    }

    handleSearch = (name) => event => {
        const value = event.target.value;

        this.setState({ [name]: event.target.value });
        const token = isAuthenticated().token;
        PostsSearch(token, value).then(data =>{
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                this.setState({posts : data});
            }
        });

    };


    handleChange = (search) => event => {
        this.setState({ [search]: event.target.value });
    };



    renderCarBazaarhome= (posts) => {
        return (
            <div className={"card"} style={{
                "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
                <div className={"card-body"}>
                    <div style={{display: "inline-flex"}}>
                        <h6 className="card-title">Total Posts</h6>
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
                            <th scope="col"><b>Post Owner</b></th>
                            <th scope="col"><b>Status</b></th>
                            <th scope="col"><b>Created at</b></th>
                            <th scope="col"><b>Actions</b></th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.slice(0, this.state.postcount).map((post,i)=>(
                            <tr scope="row"  key={i}>

                                <td >
                                    <Link to={`/post/${post._id}`} className="">{post.title}</Link>
                                </td>
                                <td> {post.postedBy.name} </td>
                                <td> {post.status} </td>
                                <td> {post.created} </td>
                                <td>
                                    <Link to={`/post_details/${post._id}`} className="btn  btn-raised btn-primary btn-sm">Details</Link>
                                </td>

                                <td>

                                    {/*{post.status === "active" && (
                                    <DisablePost post_id={post._id} />
                                )}

                                {post.status === "deactivated" && (
                                    <EnablePost post_id={post._id} />
                                )}
                                <WarnUser email={post.postedBy.email} postname = {post.title}/>*/}
                                </td>


                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    };


    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div className={"container"}>
                {this.state.searched ?  (
                    <div>
                        { this.state.loading ? (
                            <div className={""}>
                                {this.renderCarBazaarhome(this.state.searchResultcarbazar)}
                            </div>

                        ): ("")}
                    </div>
                ): (

                    <div>

                        {this.renderCarBazaarhome(this.state.posts)}
                    </div>
                )}


            </div>
        );
    }
}

export default AdsManagement;