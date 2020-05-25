import React, {Component} from 'react';
import {follow, Unfollow} from "./apiUser";

class FollowProfileButton extends Component {
    clickFollow = () =>{
        this.props.onButtonClick(follow);
    };

    clickUnFollow = () =>{
        this.props.onButtonClick(Unfollow);
    }

    render() {

        return (

            <div className={"d-inline-block"}>
                {
                    !this.props.following ? (<button onClick={this.clickFollow} className="btn btn-success btn-raised mr-5">Follow</button>) :
                        (<button onClick={this.clickUnFollow} className="btn btn-warning btn-raised">UnFollow</button>)
                }
            </div>
        );
    }
}

export default FollowProfileButton;