import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from "../auth";

class Profiletabs extends Component {




    render() {
        const {followers, following , posts, saved, user, Buyerposts} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h3> Followings </h3>
                        <hr/>
                            {following.map((person , i)=>{
                                return (
                                    <div key={i}>

                                            <div>
                                                <Link style={{'color': 'deepskyblue'}}  to={`/user/${person._id}`} >
                                                    <h6>{person.name}</h6>
                                                </Link>
                                            </div>

                                    </div>
                                )
                            })}

                    </div>

                    <div className="col-md-2">
                        <h3> Followers </h3>
                        <hr/>
                        {followers.map((person , i)=>{
                            return (
                                <div key={i}>
                                    <div>
                                        <Link style={{'color': 'deepskyblue'}}  to={`/user/${person._id}`} >
                                            <div>
                                                <h6>{person.name}</h6>
                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="col-md-3">
                        <h3> Posts </h3>
                        <hr/>

                        {posts.map((post , i)=>{
                            return (
                                <div key={i}>
                                    <div>
                                        <Link style={{'color': 'deepskyblue'}}  to={`/post/${post._id}`} >
                                            <div>
                                                <h6>{post.title}</h6>

                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="col-md-2">
                        <h3> BuyerPosts </h3>
                        <hr/>

                        {Buyerposts.map((post , i)=>{
                            return (
                                <div key={i}>
                                    <div>
                                        <Link  style={{'color': 'deepskyblue'}}  to={`/b_post/${post._id}`} >
                                            <div>
                                                <h6>{post.title}</h6>

                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                    </div>


                    {isAuthenticated().user && isAuthenticated().user._id=== user
                        ? (
                            <div className="col-md-3">
                                <h3> Saved Posts </h3>
                                <hr/>

                                {saved.map((saved , i)=>{
                                    return (
                                        <div key={i}>
                                            <div>
                                                <Link style={{'color': 'deepskyblue'}}  to={`/post/${saved._id}`} >
                                                    {saved.title}
                                                </Link>
                                                <Link to={`/unSavePost/${saved._id}`} className="btn  btn-raised btn-danger btn-sm ml-5">Unsave</Link>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        ): ("")

                    }



                </div>
            </div>
        );
    }
}

export default Profiletabs;