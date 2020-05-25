import React,  {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { verifyDealer} from "./apiReport";
import {isAuthenticated} from "../auth";

class verifyDealers extends Component {
    constructor(){
        super();
        this.state={
            redirect : false
        };
    }


    enable = () =>{
        const userId = this.props.user_id;
        const token = isAuthenticated().token;
        verifyDealer(userId, token)
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
            return <Redirect to={"/dealer_details/"+this.props.user_id}/>
        }
        return (

            <div>
                <div
                    className="alert alert-danger"
                    style={{ display: this.state.redirect ? "" : "none" }}
                >
                    Verified Successfully!
                </div>
                <div>
                    <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }}  className="btn btn-raised btn-primary btn-lg" onClick={this.enable}>
                        Verify Dealer
                    </button>
                </div>

            </div>

        );
    }
}

export default verifyDealers;