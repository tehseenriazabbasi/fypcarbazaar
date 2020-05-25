import React, {Component} from 'react';
import {
    searchCarBazar,
    listBuyerSavedByUser,
    list_buyerPosts, removebuyer
} from "./apiPost";
import {Link} from 'react-router-dom';
import User_Avatar from "../images/User_Avatar.png";
import {isAuthenticated} from "../auth";

import './posts.css';
class BuyerPosts extends Component {

    constructor(){
        super();
        this.state= {
            b_posts: [],
            saved:[],
            search: "",
            searchResultcarbazar: [],
            searched : false,
            loading: false,
            error: ""
        }
    }



    handleChange = (search) => event => {

        this.setState({error: ""});
        this.setState({ [search]: event.target.value });
        /*searchCarBazarfilter(this.state.reg_city).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({searchResultcarbazar:data})
                this.setState({searched: true});
            }
        })*/

    };

    loadsavedPosts = (userId) => {
        const token = isAuthenticated().token;
        listBuyerSavedByUser(userId, token).then( data => {
            if(data.error){
                console.log(data);
                console.log(data.error);
            }
            else {
                console.log({data});
                this.setState({saved: data});
            }
        })
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading :true});

        searchCarBazar(this.state.search).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({searchResultcarbazar: data});
                this.setState({searched: true});
            }
        });



    };


    deletePost = (postid) => {
        const postId = postid;
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





    componentDidMount() {
        console.log("local", localStorage.getItem("jwt"));
        if(localStorage.getItem("jwt") != null){
            const userId = isAuthenticated().user._id;
            this.loadsavedPosts(userId);
        }

        list_buyerPosts().then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({b_posts: data});
            }
        });

    }





    renderCarBazaarBuyerPost= (posts, saved) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Car Bazaar Home</h6>
                    <hr/>
                    <div className="row">
                        {posts.map((post,i)=>{

                            const posterId = post.postedBy? post.postedBy._id : "";
                            const posterName = post.postedBy? post.postedBy.name : "";
                            var check =false;
                            for (var j =0; j< saved.length; j++){
                                if(saved[j]._id === post._id ){
                                    check= true;
                                }
                                console.log(check);
                            }

                            return (
                                <div className={"col-sm-4"}>
                                    <div className="card card-post"  key={i} >
                                        <div style={{"text-align": "right"}} className="dropdown">

                                            <i className="fa fa-ellipsis-h fa-2x mr-2" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false"></i>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                                {isAuthenticated().user && isAuthenticated().user._id === posterId  &&
                                                <>

                                                    <a className="dropdown-item" href={`/post/b_edit/${post._id}`}>Edit Post</a>
                                                    <a className="dropdown-item" onClick={() => this.deletePost (post._id)}>Delete Post</a>

                                                </>
                                                }

                                                {isAuthenticated() && isAuthenticated().user._id !== post.postedBy._id && !check? (

                                                    <a href={`/saveBuyerPost/${post._id}`} className="dropdown-item">Save Post</a>

                                                ): ("")}

                                                {isAuthenticated() && isAuthenticated().user._id !== post.postedBy._id && check? (

                                                    <a href={`/unsaveBuyerPost/${post._id}`} className="dropdown-item">UnSave Post</a>

                                                ): ("")}

                                            </div>
                                        </div>
                                        <div style={{"text-align": "center"}}>

                                            <img className={"card-img-top mx-auto"} src={'http://localhost:8080'+post.photo[0]} alt={post.title} style={{
                                                height: "200px",
                                                "width": "auto",
                                                "max-width": "100%"
                                            }}
                                                 onError={i => (i.target.src = `${User_Avatar}`)}
                                            />
                                        </div>
                                        <div className="card-body" style={{"border-left": "5px solid yellow"}}>
                                                <h5 className="card-title font-weight-bold mb-0"><em style={{color: '#c43b3b'}}>Price Range:</em>{post.price}</h5>
                                                <p className="card-text text-muted"><b style={{color: '#c43b3b'}}>Title:</b> {post.title}</p>
                                                <p className={"card-text mb-0"}><b style={{color: '#c43b3b'}}>Required:</b> {post.make + " " + post.model} </p>
                                                <p className="card-text mb-0"><b style={{color: '#c43b3b'}}>Registration Year:</b> { post.registration_year }</p>
                                                <p className="card-text mb-0"><b style={{color: '#c43b3b'}}>Mileage Range:</b> { post.mileage}</p>
                                                <p className="card-text mb-0"><b style={{color: '#c43b3b'}}>Engine Capacity:</b> {post.engine_capacity}cc</p>
                                                <p className="card-text text-muted"> <b style={{color: '#c43b3b'}}>Location: </b>{post.city}</p>

                                            <p className={"font-italic mark"}>
                                                Posted by {" "}
                                                <Link to ={`/user/${posterId}`}> {posterName}</Link>
                                                {" "}
                                                on Date {new Date(post.created).toDateString()}
                                            </p>


                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        )
    };


    render() {

        const { b_posts ,saved,  searchResultcarbazar} = this.state;

        return (
            <div>
                {this.state.searched ?  (
                    <div>
                        { this.state.loading ? (
                            <div className={"jumbotron"}>
                                <p> Please wait, your data is being fetched from OlX and CarBazaar</p>
                            </div>

                        ): (
                            ""
                        )}
                    </div>

                ): (
                    <div>
                        <div
                            className="alert alert-danger"
                            style={{ display: this.state.error ? "" : "none" }}
                        >
                            {this.state.error}
                        </div>

                        <div className={"row mt-2"}>
                            <div className={"col-md-1"}>

                            </div>
                            <div className={"col-md-10"}>
                                <div className={"clearfix"}></div>

                                {this.renderCarBazaarBuyerPost(b_posts, saved)}
                            </div>
                            <div className={"col-md-1"}>

                            </div>
                        </div>


                    </div>
                )}
            </div>
        );
    }
}

export default BuyerPosts;
