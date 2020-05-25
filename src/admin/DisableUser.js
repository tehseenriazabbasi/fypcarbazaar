import React,  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {disableUser} from "./apiReport";
import {isAuthenticated} from "../auth";

class DisableUser extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }


    disable = () =>{
      const userid = this.props.user_id;
      const token = isAuthenticated().token;
      disableUser(userid, token)
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
            return <Redirect to={"/profile_details/"+this.props.user_id}/>
        }
        return (

            <div>
                <div
                    className="alert alert-danger"
                    style={{ display: this.state.redirect ? "" : "none" }}
                >
                    User Disabled Succesfully!
                </div>
                <div>
                    <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger btn-lg mt-2" onClick={this.disable}>
                        Disable User
                    </button>
                </div>

            </div>

        );
    }
}

export default DisableUser;