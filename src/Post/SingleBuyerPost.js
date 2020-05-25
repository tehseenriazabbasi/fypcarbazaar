import React, {Component} from 'react';
import {b_singlePost, removebuyer, findmatches} from "./apiPost";
import {isAuthenticated} from "../auth";
import Verify from "../core/verify";
import {Player} from "video-react";
import avatar from "../images/images.jpg";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import {MDBInput} from "mdbreact";
import {Link} from "react-router-dom";
import ReportPost from "./reportPost";


class SingleBuyerPost extends Component {

    state = {
        post : "",
        photo : [],
        redirectToProfile : false,
        active: false,
        postfound : []
    };

    componentDidMount() {
        const postId = this.props.match.params.bpostId;
        b_singlePost(postId).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({photo : data.photo});
                this.setState({post : data});

                findmatches(this.state.post).then(data=>{
                    if(data.error){
                        console.log(data.error)
                    }
                    else {
                        this.setState({postfound : data});
                    }
                })


            }
        });
    }

    deletePost = (postid) => {
        const postId = this.props.match.params.bpostId;
        console.log(postId);
        const token = isAuthenticated().token;
        let ans = window.confirm("Are you sure you want to delete your post?");
        if(ans){
            removebuyer(postId, token).then(data =>{
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

                                            <div className="carousel-item active" style={{"text-align": "center", 'background-color': "#d7d7d7"}} >
                                                <img className={"card-img-top mx-auto"} style={{
                                                    height: "500px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }} src={'http://localhost:8080'+photos[0]} alt="First slide"/>
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



                            </div>

                            <div className={"card mt-1" } style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>Requirments</h6>
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
                                    <h6 className={"card-title"} style={{'font-size': 'large'}}>Buyer's Description</h6>
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
                                    <p className={"card-text text-muted"}>{post.city}</p>
                                </div>
                            </div>

                            {isAuthenticated().user && isAuthenticated().user._id === posterId  &&
                            <>
                                <div className={"card mt-2"}style={{"box-shadow": "0 2px 4px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                                    <div className={"card-body"}>
                                        <h6 className={"card-title"} style={{'font-size': 'large'}}>Actions</h6>
                                        <hr/>

                                        <Link to={`/post/b_edit/${this.state.post._id}`} className="btn  btn-raised btn-primary mr-5">Upadte Post</Link>

                                        <button onClick={this.deletePost} className="btn btn-raised btn-danger">
                                            Delete Post
                                        </button>

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

    renderMatches =(post) =>{

        return (
            <table className={"table"}>
                <thead>
                <tr>
                    <th scope="col"><b>Title</b></th>
                    <th scope="col"><b>Make</b></th>
                    <th scope="col"><b>Model</b></th>
                    <th scope="col"><b>Registration Year</b></th>
                    <th scope="col"><b>Mileage</b></th>
                    <th scope="col"><b>Location</b></th>
                    <th scope="col"><b>Engine(cc)</b></th>
                </tr>
                </thead>
                <tbody>
                {post.map((post,i)=>(
                    <tr scope="row"  key={i}>

                        <td >
                            <Link to={`/post/${post._id}`} className="">{post.title}</Link>
                        </td>
                        <td>
                            {this.state.post.make == post.make ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fas fa-times"></i>
                                </div>)
                            }
                        </td>


                        <td>
                            {this.state.post.model == post.model ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fa fa-times"></i>
                                </div>)
                            }

                        </td>



                        <td>

                            {this.state.post.registration_year == post.mileage.registration_year
                                ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fa fa-times"></i>
                                </div>)
                            }
                        </td>

                        <td>

                            {this.state.post.mileage == post.mileage ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fa fa-times"></i>
                                </div>)
                            }
                        </td>

                        <td>

                            {this.state.post.city == post.city ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fa fa-times"></i>
                                </div>)
                            }
                        </td>

                        <td>

                            {this.state.post.engine_capacity == post.engine_capacity ?
                                (<div>
                                    <i className="fa fa-check"></i>
                                </div>):
                                (<div>
                                    <i className="fa fa-times"></i>
                                </div>)
                            }
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        )
    }


    render() {
        if(this.state.redirectToProfile){/*
            return(
                <Redirect to ={"/user/"+this.state.post.postedBy._id}/>
            )*/

        }
        const {post, photo, video} = this.state;


        return (
            <div className={"container mt-5"}>
                {/*<h2 className={"display-2 mt-5 mb-5"}>{post.title}</h2>*/}
                {this.renderAd(post , photo, video)}
                <hr/>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>
                            Best Matches
                        </h5>

                        <div>
                            {this.renderMatches(this.state.postfound)}


                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default SingleBuyerPost;