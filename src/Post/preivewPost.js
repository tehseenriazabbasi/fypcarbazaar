import React, {Component} from 'react';
import {singlePost, remove} from "./apiPost";
import User_Avatar from "../images/User_Avatar.png";
import avatar from "../images/images.jpg";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {Redirect} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import "./singlePost.css"
import ReportPost from './reportPost';
import DisablePost from "../admin/DisablePost";
import EnablePost from "../admin/EnablePost";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {MDBInput} from "mdbreact";
import {sendMail, publish} from "./apiPost";
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import Verify from "../core/verify";


const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


class SinglePost extends Component {
    state = {
        post : "",
        photo : [],
        video:[],
        redirectToProfile : false,
        active: false,
        name: "",
        subject : "",
        email: "",
        message: "",
        result: ""
    };

    handleChange = (name) => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({photo : data.photo});
                this.setState({video : data.video});
                this.setState({post : data});
                this.setState({message : `Hi,
I am interested in your car ${data.make} ${data.model} advertised on Carbazar.com. Please let me know if it's still available.
Thanks.`});
                this.setState({title: `Used ${data.make} ${data.model}`})

            }
        });
    }
    publishPost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        publish(token,postId).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({result: data.result})
                console.log("published!")

            }
        });

    };

    contact = () =>{
        const posterEmail = this.state.post.postedBy? this.state.post.postedBy.email : "";
        const name = this.state.name;
        const email = this.state.email;
        const subject = this.state.title;
        const message = this.state.message;

        sendMail(name, email, subject, message, posterEmail)
            .then(data=> {
                if(data.error){
                    console.log(data.error);
                }
                else{
                    this.setState({redirect: true});
                }
            })
    };

    renderAd= (post, photos, video) =>{
        const posterId = post.postedBy? post.postedBy._id : "";
        const posterName = post.postedBy? post.postedBy.name : "";
        const posterEmail = post.postedBy? post.postedBy.email : "";
        const Adsnumber = post.postedBy? post.postedBy.AdsNumber : "";
        const phone = post.postedBy? post.postedBy.phone : "";
        return(

            <div>
                { !isAuthenticated().user.verified && (

                    <div>


                        <div className="row">
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-8">
                                <div>
                                    <Verify/>
                                </div>
                            </div>
                            <div className="col-md-2">

                            </div>
                        </div>

                    </div>

                )}

                { isAuthenticated().user.verified && (
                    <div className={"row"}>


                        <div className={"col-md-8"}>
                            <div className={"card"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>

                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        {/*<ol className="carousel-indicators">*/}
                                        {/*    <li data-target="#carouselExampleIndicators" data-slide-to="0"*/}
                                        {/*        className="active"></li>*/}
                                        {/*    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>*/}
                                        {/*    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>*/}
                                        {/*</ol>*/}

                                        <div className="carousel-inner">

                                            <div className="carousel-item active capt" style={{"text-align": "center", 'background-color': "#d7d7d7"}} >
                                                <img className={"card-img-top mx-auto"} style={{
                                                    height: "500px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }} src={photos[0]} alt="First slide"/>
                                                <div className="top-left">1/3</div>
                                            </div>
                                            <div className="carousel-item capt" style={{"text-align": "center" ,'background-color': "#d7d7d7"}}>
                                                <img className={"card-img-top mx-auto"} style={{
                                                    height: "500px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }} src={photos[1]} alt="Second slide"/>
                                                <div className="top-left">2/3</div>
                                            </div>

                                            <div className="carousel-item capt" style={{"text-align": "center" ,'background-color': "#d7d7d7"}}>
                                                <img className={"card-img-top mx-auto"} style={{
                                                    height: "500px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }} src={photos[2]} alt="Second slide"/>
                                                <div className="top-left">3/3</div>
                                            </div>

                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                                           data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                                           data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>

                                </div>


                                {video.length != 0 &&
                                <>
                                    <div className={"mt-2"}>
                                        <Player
                                            playsInline
                                            poster="/assets/poster.png"
                                            src={'http://localhost:8080'+video[0]}
                                        />
                                    </div>
                                </>
                                }


                            </div>

                            <div className={"card mt-1" } style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>Details</h6>
                                    <hr/>
                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Make</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.make}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Model</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.model}</p>
                                        </div>
                                    </div>


                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Year</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.registration_year}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Kms Driven</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.mileage}</p>
                                        </div>
                                    </div>

                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Feul</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.engine_type}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Registered In</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.registration_city}</p>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Condition</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.condition}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Color</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.exterior_color}</p>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={"text-muted"}>Transmission</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.transmission}</p>
                                        </div>

                                    </div>
                                    <hr/>
                                    <h6 className={"card-title"}>Description</h6>
                                    <p>{post.body}</p>
                                </div>

                            </div>
                        </div>
                        <div className={"col-md-4"}>
                            <div className={'card'}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}} onClick={()=>this.setState({active: !this.state.active})} onBlur={()=>this.setState({active: !this.state.active})}>
                                <div className={"card-body"}>
                                    <h4 className={"card-title"}><b>Rs  {post.price}</b></h4>
                                    <p><b>{post.registration_year} - {post.mileage}km</b></p>
                                    <p className="card-text text-muted">{post.make} {post.model} {post.engine_capacity}cc model {post.registration_year}</p>
                                    <div style={{"display": "flex"}}>
                                        <p className={"card-text text-muted"}>{post.city}</p>
                                        <p className={"card-text text-muted ml-5"}>{new Date(post.created).toDateString()}</p>
                                    </div>

                                </div>
                            </div>

                            <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"} style={{'font-size': 'large'}}>Seller Description</h6>
                                    <hr/>
                                    <a href={`/user/${posterId}`} style={{'display': 'flex', 'text-decoration': 'none'}}>
                                        <img style={{'border-radius': '100%', 'height': '70px', 'width': '70px'}} src={avatar} alt=""/>
                                        <h5 style={{"text-align": "center",
                                            "margin-top": "27px",
                                            "margin-left": "30px"}}>{posterName}</h5>
                                        <i style={{"margin-top": "32px", 'margin-left': '60px'}} className="fa fa-arrow-right"></i>
                                    </a>

                                </div>
                            </div>


                            <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"} style={{'font-size': 'large'}}>Posted In</h6>
                                    <hr/>
                                    <p className={"card-text text-muted"}>{post.city}</p>
                                </div>
                            </div>

                            {isAuthenticated().user && isAuthenticated().user._id === posterId  &&
                            <>
                                <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"} style={{'font-size': 'large'}}>Actions</h6>
                                        <hr/>

                                        <Link to={`/post/edit/${this.state.post._id}`} className="btn  btn-raised btn-primary mr-5">Upadte Post</Link>

                                        <button onClick={this.publishPost} type="button" className="btn btn-danger" data-toggle="modal"
                                                data-target="#exampleModal">
                                            Publish
                                        </button>

                                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Post Published</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Congratulations, your Ad is now live, Click Okay to see the post live!
                                                    </div>
                                                    <div className="modal-footer">

                                                        <a href={`/post/${this.state.result._id}`} type="button" className="btn btn-danger">Okay
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>




                            </>
                            }



                        </div>
                    </div>
                ) }


            </div>

        )
    }


    render() {
        if(this.state.redirectToProfile){
            return(
                <Redirect to ={"/user/"+this.state.post.postedBy._id}/>
            )

        }
        const {post, photo, video} = this.state;


        return (
            <div className={"container mt-3"}>
                {/*<h2 className={"display-2 mt-5 mb-5"}>{post.title}</h2>*/}

                <div className={"card mb-2"}>
                    <div className={"card-body"}>
                        <div className={"card-title"}>
                            <h6>Post Preview</h6>
                        </div>

                        <div>
                            <p>This is how your post will look like after being published! Make Sure you publish the post after previewing!</p>

                        </div>
                    </div>
                </div>
                {this.renderAd(post , photo, video)}
            </div>
        );
    }
}


SinglePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SinglePost);