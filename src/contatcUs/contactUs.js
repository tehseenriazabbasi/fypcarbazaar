import React, {Component} from 'react';
import './contact.css'
import gif from '../images/q1.gif'
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {MDBInput} from "mdbreact";
import Button from "@material-ui/core/Button";
import {sendMail} from "./contactApi"
import Container from "@material-ui/core/Container";

class ContactUs extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            subject : "",
            email: "",
            message: "",
            loading : false,
            redirectToProfile: false,
            error: "",
            sent: false
        }
    }

    handleChange = (name) => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    contact = () =>{
        const name = this.state.name;
        const email = this.state.email;
        const subject = this.state.subject;
        const message = this.state.message;
        sendMail(name, email, subject, message)
            .then(data=> {
                if(data.error){
                    console.log(data.error);
                }
                else{
                    this.setState({redirect: true});
                    this.setState({error: "Mail Sent Succesfully"})
                }
            })

    };

    render() {
        return (
            <div className={"container"}>

                <div className={"row mt-5"}>
                    <div className={"col-md-4 text-center"}>
                        <i className="img-color fa fa-envelope-open fa-4x" ></i>
                        <h4 className={"mt-4"}><strong>Email</strong></h4>
                        <p className={"text-muted mt-2"}>info@carbazar.com</p>
                    </div>

                    <div className={"col-md-4 text-center"}>
                        <i className="img-color fa fa-map-marker fa-4x" ></i>
                        <h4 className={"mt-4"}><strong>Address</strong></h4>
                        <p className={"text-muted mt-2"}>CUI, Park Road Islamabad</p>
                    </div>

                    <div className={"col-md-4 text-center"}>
                        <i className="img-color fa fa-tty fa-4x" ></i>
                        <h4 className={"mt-4"}><strong>Phone</strong></h4>
                        <p className={"text-muted mt-2"}>(0331) 7354483</p>
                    </div>
                </div>

                <div className={"contact"}>
                    <h3><strong>CONTACT US</strong></h3>
                </div>

                <div className={"row"}>

                    <div className={"col-md-6"}>
                        <img style={{width: '100%'}} src={gif} alt=""/>
                    </div>

                    <div className={"col-md-6"}>
                        <form >
                            <div
                                className="alert alert-success"
                                style={{ display: this.state.error ? "" : "none" }}
                            >
                                {this.state.error}
                            </div>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Your Name"
                                name="title"
                                onChange={this.handleChange("name")}
                            />

                            <TextField
                                type={"email"}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Your Email"
                                name="email"

                                onChange={this.handleChange("email")}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="subject"
                                label="Your Subject"
                                name="subject"

                                onChange={this.handleChange("subject")}
                            />

                            <InputLabel className={"mt-2"} id="color">Message</InputLabel>
                            <MDBInput
                                type="textarea"
                                rows="7"
                                value={this.state.message}
                                onChange={this.handleChange("message")}
                            />

                            <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger" onClick={this.contact}>
                                Send
                            </button>

                        </form>

                    </div>

                </div>




            </div>
        );
    }
}

export default ContactUs;