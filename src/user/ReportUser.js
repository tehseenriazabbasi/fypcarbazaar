import React, {Component} from 'react';
import {isAuthenticated, signout} from "../auth";
import { reportUser} from "./apiUser";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


class ReportUser extends Component {
    constructor(){
        super();
        this.state={
            redirect : false,
            value: "",
            error: ""
        };
    }

    report =() => {
      const Reported_user_id = this.props.usertoReport;
      const user_id = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const username = isAuthenticated().user.name;
        if(this.isvalid()){
            reportUser(user_id,Reported_user_id,username, this.state.value ,token)
                .then(data=> {
                    if(data.error){
                        console.log(data.error);
                    }
                    else{
                        this.setState({redirect: true});
                    }
                })
        }



    };

    isvalid () {
        if (this.state.value == ''){
            this.setState({error: "Select a reason"})
            return false
        }
        return true;
    }

    handleChange = (event) => {
        this.setState({value : event.target.value})
    };

    render() {
        return (
            <div>
                <button data-toggle="modal" data-target="#exampleModal" className="btn btn-raised btn-warning mt-2" >
                    Report User
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Report Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div
                                    className="alert alert-danger"
                                    style={{ display: this.state.error ? "" : "none" }}
                                >
                                    {this.state.error}
                                </div>
                                <h5>Why are you reporting this user?</h5>
                                <hr/>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Reason</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.state.value}  onChange={this.handleChange}>
                                        <FormControlLabel value="Fake account" control={<Radio />} label="Fake account" />
                                        <FormControlLabel value="Abusive Conversation" control={<Radio />} label="Absuive conversation" />
                                        <FormControlLabel value="Fake Posts" control={<Radio />} label="Fake Posts" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.report}>Report</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportUser;