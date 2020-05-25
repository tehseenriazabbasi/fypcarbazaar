import React,  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { enablePost} from "./apiReport";
import {isAuthenticated} from "../auth";

class EnablePost extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }


    enable = () =>{
        const postid = this.props.post_id;
        const token = isAuthenticated().token;
        enablePost(postid, token)
            .then(data=> {
                if(data.error){
                    console.log(data.error);
                }
                else{
                    this.setState({redirect: true});
                }
            })

    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/post_details/"+this.props.post_id}/>
        }
        return (

            <div>
                <div
                    className="alert alert-danger"
                    style={{ display: this.state.redirect ? "" : "none" }}
                >
                    Post Enabled Succesfully!
                </div>
                <div>
                    <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-primary btn-lg" onClick={this.enable}>
                        Activate
                    </button>
                </div>

            </div>

        );
    }
}

export default EnablePost;