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
import {sendMail} from "./apiPost";
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
        message: ""
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
    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        let ans = window.confirm("Are you sure you want to delete your post?");
        if(ans){
            remove(postId, token).then(data =>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    this.setState({redirectToProfile: true})
                    console.log("deleted successfully")
                }
            })
        }

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

                { isAuthenticated() && !isAuthenticated().user.verified && (

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

                {isAuthenticated().user.verified && (
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

                                            src={video[0]}
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
                                            <p className={""}>Make</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.make}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Model</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.model}</p>
                                        </div>
                                    </div>


                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Year</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.registration_year}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Kms Driven</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.mileage}</p>
                                        </div>
                                    </div>

                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Feul</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.engine_type}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Registered In</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.registration_city}</p>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Condition</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.condition}</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Color</p>
                                        </div>
                                        <div className={"col-md-3"}>
                                            <p>{post.exterior_color}</p>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-3"}>
                                            <p className={""}>Transmission</p>
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
                                    <p className="card-text ">{post.make} {post.model} {post.engine_capacity}cc model {post.registration_year}</p>
                                    <div style={{"display": "flex"}}>
                                        <p className={"card-text "}>{post.city}</p>
                                        <p className={"card-text  ml-5"}>{new Date(post.created).toDateString()}</p>
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


                                    {isAuthenticated().user && isAuthenticated().user._id !== posterId  &&
                                    <>



                                        <div>

                                            {isAuthenticated().user && isAuthenticated().user._id !== posterId && Adsnumber &&
                                            <>
                                                <div style={{textAlign: 'center'}}>
                                                    <p><i className="fa fa-phone mr-2" aria-hidden="true"></i> {phone}</p>
                                                </div>
                                            </>}
                                            <div style={{textAlign: 'center'}}>
                                                <button  type="button" className="btn btn-primary" data-toggle="modal"
                                                         data-target="#exampleModal">
                                                    <i className="fa fa-envelope-open mr-2"></i>
                                                    Contact Seller
                                                </button>
                                            </div>



                                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">

                                                            <h5 className="modal-title" id="exampleModalLabel">Contact Seller</h5>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div
                                                                className="alert alert-success"
                                                                style={{ display: this.state.redirect ? "" : "none" }}
                                                            >
                                                                {"Mail is sent"}
                                                            </div>
                                                            <InputLabel className={"mt-2"} id="color"><b>{`Title: Used ${post.make} ${post.model}`}</b></InputLabel>

                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="name"
                                                                label="Your Name"
                                                                name="name"
                                                                onChange={this.handleChange("name")}
                                                            />

                                                            <TextField
                                                                type={"email"}
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="email"
                                                                label="Your Email"
                                                                name="email"

                                                                onChange={this.handleChange("email")}
                                                            />



                                                            <InputLabel className={"mt-2"} id="color">Message</InputLabel>
                                                            <MDBInput
                                                                disabled={true}
                                                                type="textarea"
                                                                rows="7"
                                                                value={`Hi,I am interested in your car ${post.make} ${post.model} advertised on Carbazar.com. Please let me know if it's still available. Thanks.`}
                                                                onChange={this.handleChange("message")}
                                                            />

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn btn-primary"  onClick={this.contact}>Send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                    }




                                </div>
                            </div>


                            <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"} style={{'font-size': 'large'}}>Posted In</h6>
                                    <hr/>
                                    <p className={"card-text"}>{post.city}</p>
                                </div>
                            </div>

                            {isAuthenticated().user && isAuthenticated().user._id === posterId  &&
                            <>
                                <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"} style={{'font-size': 'large'}}>Actions</h6>
                                        <hr/>

                                        <Link to={`/post/edit/${this.state.post._id}`} className="btn  btn-raised btn-primary mr-5">Upadte Post</Link>

                                        <button onClick={this.deletePost} className="btn btn-raised btn-danger">
                                            Delete Post
                                        </button>

                                    </div>


                                </div>




                            </>
                            }

                            {isAuthenticated().user && isAuthenticated().user._id !== posterId  &&
                            <>

                                <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"} style={{'font-size': 'large'}}>Actions</h6>
                                        <hr/>
                                        <ReportPost posttoReport = {this.props.match.params.postId}/>
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
            <div className={"container mt-5"}>
                {/*<h2 className={"display-2 mt-5 mb-5"}>{post.title}</h2>*/}
                {this.renderAd(post , photo, video)}
            </div>
        );
    }
}


SinglePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SinglePost);