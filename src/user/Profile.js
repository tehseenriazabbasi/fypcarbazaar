import React , {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from 'react-router-dom';
import {read} from "./apiUser";
import User_Avatar from "../images/User_Avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ReportUser from "./ReportUser"
import Profiletabs from "./Profiletabs";
import {listBuyerByUser, listByUser, listSavedByUser} from "../Post/apiPost";
import  {senEmail} from "../auth";
import DisableUser from "../admin/DisableUser";
import EnableUser from "../admin/EnableUser";
import Verify from "../core/verify"
import './profile.css'

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user:{following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error : "",
            posts : [],
            Buyerposts : [],
            saved: [],
            verified : false
        }
    }

    loadPosts = (userId) => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then( data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                console.log({data});
                this.setState({posts: data});
            }
        })
    };


    loadBuyerPosts = (userId) => {
        const token = isAuthenticated().token;
        listBuyerByUser(userId, token).then( data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                console.log({data});
                this.setState({Buyerposts: data});
            }
        })
    };

    loadsavedPosts = (userId) => {
        const token = isAuthenticated().token;
        listSavedByUser(userId, token).then( data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                console.log({data});
                this.setState({saved: data});
            }
        })
    };


    init = (userid) => {
        const token = isAuthenticated().token;

        read(userid, token)
            .then(data => {
                if(data.error){
                    console.log("erorr here");
                    this.setState({redirectToSignin: true});
                }
                else{
                    let following = this.checkFollow(data);
                    console.log(data);
                    this.setState({user: data, following: following});
                    this.loadPosts(data._id);
                    this.loadBuyerPosts(data._id);
                    this.loadsavedPosts(data._id);
                }
            });
    };
    send = event => {
        event.preventDefault();
        senEmail(this.props.match.params.userId).then(data=> {
            if(data.error){
                console.log("error");
            }
            else console.log("mail sent");
        })
    };
    componentDidMount() {

        const userid= this.props.match.params.userId;
        this.init(userid);


    }

    componentWillReceiveProps(Props) {

        const userid= Props.match.params.userId;
        this.init(userid);
    }

    //check following

    checkFollow = (user) => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        });
        return match;
    }
    clickFollowButton = CallApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        CallApi(userId, token, this.state.user._id)
            .then(data =>{
                if(data.error){
                    this.setState({error: data.error});
                }
                else{
                    this.setState({user : data, following : !this.state.following});
                }
            })
    }
    render() {

        const {posts} = this.state;
        //const photourl = this.state.user._id? "https://carbazar-server.herokuapp.com/user/photo/"+this.state.user._id+"?"+new Date().getTime() : `${User_Avatar}`;
        const photourl = this.state.user._id? this.state.user.photo : `${User_Avatar}`;

        const red = this.state.redirectToSignin;
        if(red){
            return <Redirect to={"/signin"}/>
        }

        return (


            <div className="container">

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

                 <div>
                     <h2 className="mt-5 mb-5">Profile</h2>
                     <div className="row">
                         <div className="col-md-4">
                             <img className={"img-thumbnail"} src={photourl} alt={this.state.user.name} style={{width: 'auto' , height : "200px"}}
                                  onError={i => (i.target.src = `${User_Avatar}`)}
                             />
                         </div>
                         <div className="col md-8">

                             <div className="lead mt-2">
                                 <p>Hello {this.state.user.name}</p>
                                 <p>Email: {this.state.user.email}</p>
                                 <p>Phone: {this.state.user.phone}</p>
                                 <p>{`Joined : ${new Date(this.state.user.created).toDateString()}`}</p>
                             </div>

                             {isAuthenticated().user && isAuthenticated().user._id=== this.state.user._id
                                 ? (
                                     <div className="d-inline-block">
                                         <Link className="btn btn-raised btn-info mr-5" to={`/post/create`}>
                                             Create Post
                                         </Link>

                                         <Link className="btn btn-raised btn-success mr-5" to={`/u/edit/${this.state.user._id}`}>
                                             Edit Profile
                                         </Link>
                                         <DeleteUser userId = {this.state.user._id}/>
                                     </div>
                                 ): (
                                     <div>
                                         <FollowProfileButton following = {this.state.following} onButtonClick = {this.clickFollowButton} />
                                         <ReportUser usertoReport = {this.props.match.params.userId}/>
                                     </div>

                                 )

                             }

                         </div>

                         <div>
                             {isAuthenticated().user &&
                             isAuthenticated().user.role === "admin" && (
                                 <div className="card mt-5">
                                     <div className="card-body">
                                         <h5 className="card-title">
                                             Admin
                                         </h5>
                                         <p className="mb-2 text-danger">
                                             Edit/Delete as an Admin
                                         </p>
                                         {/*<Link
                                        className="btn btn-raised btn-success mr-5"
                                        to={`/u/edit/${this.state.user._id}`}
                                    >
                                        Edit Profile
                                    </Link>*/}
                                         <DeleteUser userId={this.state.user._id}/>

                                         {!this.state.user.disabled && (
                                             <DisableUser user_id={this.state.user._id} />
                                         )}

                                         {this.state.user.disabled && (
                                             <EnableUser user_id={this.state.user._id} />
                                         )}



                                     </div>
                                 </div>
                             )}
                         </div>
                     </div>
                     <hr/>

                     <div className="col-md-12"></div>
                     <p className={"lead"}>{this.state.user.about}</p>

                     <hr/>

                     <Profiletabs
                         followers = {this.state.user.followers}
                         following = {this.state.user.following}
                         posts = {posts}
                         Buyerposts = {this.state.Buyerposts}
                         saved ={this.state.saved}
                         user = {this.state.user._id}
                     />

                 </div>
                )}


            </div>
        )
    }
}

export default Profile;