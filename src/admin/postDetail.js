import React, {Component} from 'react';
import DisablePost from "./DisablePost";
import EnablePost from "./EnablePost";
import {singlePost} from "../Post/apiPost";
import Warn from "./WarnUser"

class PostDetail extends Component {
    state = {
        post : "",
        photo : [],
        redirectToProfile : false
    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({photo : data.photo});
                this.setState({post : data});

            }
        });
    }

    render() {
        const {post, photo} = this.state;
        const posterName = post.postedBy? post.postedBy.name : "";
        const posterEmail = post.postedBy? post.postedBy.email : "";
        return (
            <div>
                <div className={"container mt-2"}>
                    <h4> {post.title} </h4>
                    <div className={"row"}>
                        <div className={"col-md-8"}>
                            <div className={"card"} style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                <h5 className={"card-title ml-3 mt-3"}> <i className="fa fa-user"></i> Details</h5>
                                <hr/>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <p className={"m-0"}><b>Post title</b></p>
                                            <p>{post.title}</p>

                                            <p className={"m-0"}><b>Post Owner</b></p>
                                            <p>{posterName}</p>

                                            <p className={"m-0"}><b>Created on</b></p>
                                            <p>{post.created}</p>

                                            <p className={"m-0"}><b>Location</b></p>
                                            <p>{post.city}</p>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <img className={"img-thumbnail"} src={'http://localhost:8080'+photo[0]}  style={{width: 'auto' , height : "200px"}}
                                            />
                                        </div>
                                    </div>

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
                                {post.status === "active" && (
                                    <DisablePost post_id={post._id} />
                                )}

                                {post.status === "deactivated" && (
                                    <EnablePost post_id={post._id} />
                                )}
                                <Warn email={posterEmail} postname = {post.title}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetail;