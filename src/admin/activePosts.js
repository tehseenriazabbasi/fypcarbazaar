import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import Posts from "../Post/Posts";
import { searchCarBazar, searchOlx} from "../Post/apiPost";

import {list} from "../Post/apiPost";
import User_Avatar from "../images/User_Avatar.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class activePosts extends Component {
    state = {
        redirectToHome: false,
        posts: [],
        searched : false,
        loading: false
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


    handleChange = (search) => event => {
        //this.setState({ [search]: event.target.value });
    };

    /*clickSubmit = event => {
        event.preventDefault();
        this.setState({loading :true})

        searchCarBazar(this.state.search).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({searchResultcarbazar: data});
                this.setState({searched: true});
            }
        });



    };*/

    renderCarBazaarhome= (posts) => {
        return (
            <div className={"card"} style={{
                "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
                <div className={"card-body"}>
                    <div style={{display: "inline-flex"}}>
                        <h6 className="card-title">Active Posts</h6>
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
                        {posts.map((post,i)=>(
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
                <div className={"mt-2"}>
                    <h4>All Posts</h4>
                </div>

                {/*<TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="search"
                    label="Search"
                    type="text"
                    id="search"
                    onChange={this.handleChange("search")}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.clickSubmit}
                >
                    Search
                </Button>
                {this.state.searched ?  (
                    <div>
                        { this.state.loading ? (
                            <div className={""}>
                                {this.renderCarBazaarhome(this.state.searchResultcarbazar)}
                            </div>

                        ): ("")}
                    </div>
                ): (*/}

                    <div>

                        {this.renderCarBazaarhome(this.state.posts)}
                    </div>



            </div>
        );
    }
}

export default activePosts;