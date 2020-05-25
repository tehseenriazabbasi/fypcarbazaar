import React, {Component} from 'react';
import {verifyLink, isAuthenticated, update} from "../auth";
import {Redirect} from "react-router-dom";

class VerifyComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        const link = this.props.match.params.verifyAccountToken;
        verifyLink(link).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.message);
                update()
                this.setState({redirect: true})

            }
        });
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"} />
        }
        return (
            <div>
                <button className={"btn btn-warning"}>Send Verification Email</button>
            </div>
        );
    }
}

export default VerifyComp;