import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {getReportedPosts, getReportedUsers, getUserPostReports, getUserReports} from "./apiReport";
import DisablePost from "./DisablePost";
import EnablePost from "./EnablePost";
import {Link, Redirect} from "react-router-dom";
import WarnUser from "./WarnUser";

class PostReports extends Component {
    state = {
        redirectToHome: false,
        posts :[],
        reports: [],
        error: false,
        postcount: 5

    };
    handleChange = (name) => event => {

        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }

        const token = isAuthenticated().token;
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
                this.setState({reports : data});
            }
        })
    }
    renderusers= (posts) => (
        <div className={"card"} style={{
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.3)"}}>
            <div className={"card-body"}>
                <div style={{display: "inline-flex"}}>
                    <h6 className="card-title">Reported Posts</h6>
                    <div className={"ml-5 mb-3"}>
                        <input
                            onChange={this.handleChange("postcount")}
                            type="number" min={1} className="form-control"
                            placeholder="Enter Record Count"/>
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
                    {posts.slice(0, this.state.postcount).map((post,i)=>(
                        <tr scope="row"  key={i}>
                            <td >
                                <Link to={`/post/${post._id}`} className="">{post.title}</Link>
                            </td>
                            <td > Fake post</td>
                            <td> {post.postedBy.email} </td>
                            <td>
                                {post.status == 'deactivated' && (<i style={{'color': 'Red'}} className="fa fa-ban fa-2x ml-2"></i>)}

                                {post.status == 'active' && (<i  style={{'color': 'Green'}} className="fa fa-check-circle ml-2 fa-2x"></i>)}
                            </td>
                            <td>
                                <Link to={`/post_details/${post._id}`} >View</Link>
                            </td>

                            <td>
                                <Link to={`/post/edit/${post._id}`}>Edit</Link>
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
            <div className={"container"}>
                <h2 className="mt-5 mb-5">Reported Posts</h2>
                {this.renderusers(this.state.posts)}
            </div>
        );
    }
}

export default PostReports;