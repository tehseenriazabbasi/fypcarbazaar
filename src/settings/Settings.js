import React, {Component} from 'react';
import {getStorage, setStorage} from "../storage";
import 'bootstrap'
import './Settings.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {isAuthenticated, signout, signup} from "../auth";

import {read, update, updateAuthUser} from "../user/apiUser";
import {changeAdSetting} from "./settingApi"
class Settings extends Component {

    constructor(){
        super();
        this.state = {
            theme: getStorage('theme'),
            font: getStorage('font'),
            family: getStorage('family'),
            privacy :true,
            notifications: false,
            password: "",
            c_password: "",
            loading: false,
            error : "",
            changed : "",
            user: {},
            AdsNumber: false
        }
        this.changeTheme = this.changeTheme.bind(this);
        this.changefont = this.changefont.bind(this);
        this.changefamily = this.changefamily.bind(this);

    }
    changeTheme(theme) {
        setStorage('theme', theme);
        window.location.reload();
    }

    changefont(font) {
        setStorage('font', font);
        window.location.reload();
    }

    changefamily(family) {
        setStorage('family', family);
        window.location.reload();
    }

    componentDidMount() {

        this.userData = new FormData();

        const userid = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        read(userid, token)
            .then(data => {
                if(data.error){
                    console.log("erorr here");
                    this.setState({redirectToSignin: true});
                }
                else{
                    this.setState({user: data});
                    this.setState({AdsNumber: data.AdsNumber});
                }
            });

    }

    handleChange = (name) => event => {
        this.setState({error: ""});
        const value = name === 'photo'? event.target.files[0] : event.target.value;

        this.userData.set(name, value);
        this.setState({ [name]:  value});
    };

    changeNotification = event =>{
        this.setState({notifications: true})

        this.setState({privacy: false})
    };


    changePrivacy = event =>{
        this.setState({notifications: false})

        this.setState({privacy: true})
    };


    isvalid = () =>{
        const {password, c_password} = this.state;





        if(password.length >=1 && password.length<8){
            this.setState({error: "password must be atleast 8 characters", loading :false});
            return false;
        }

        if(password != c_password){
            this.setState({error: "passwords donot match", loading :false});
            return false;
        }


        return true;

    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading :true});
        if(this.isvalid()){
            const token = isAuthenticated().token;
            const userId= isAuthenticated().user._id;

            update(userId, token, this.userData)
                .then(data=> {
                    if(data.error)
                        this.setState({error: data.error});
                    else {
                        updateAuthUser(data, ()=>{
                            this.setState({
                                changed: "Password Changed Succesfully!"
                            })
                        });

                    }
                })

        }
    };

    changeSetting = event => {
        event.preventDefault();
        const value = this.state.AdsNumber
        this.setState({AdsNumber: !value})
        changeAdSetting(isAuthenticated().user._id);

    };

    render() {


        return (
            <div>
                <div className={"row mt-3"}>
                    <div className={"col-md-2"}>
                        <div className={""}>
                            <div className={"card-body"}>
                                <h6 className={"card-title"}><b>Settings</b> </h6>
                                <hr/>
                                <p className={"text-muted"}><p onClick={this.changePrivacy} style={{'color': 'black' , 'font-size': 'large'}}>Privacy</p></p>

                                <p className={"text-muted"}><p onClick={this.changeNotification} style={{'color': 'black' , 'font-size': 'large'}}>Notifications</p></p>

                                <p className={"text-muted"}><a href="/guidelines" style={{'color': 'black' , 'font-size': 'large'}}>Help & Guidelines</a></p>




                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="theme-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {`Font-Size: ${this.state.font}`}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="theme-dropdown">
                                        <div className="dropdown-item" onClick={() => this.changefont('')}>Default</div>
                                        <div className="dropdown-item" onClick={() => this.changefont('small')}>Small</div>
                                        <div className="dropdown-item" onClick={() => this.changefont('medium')}>Medium</div>
                                        <div className="dropdown-item" onClick={() => this.changefont('large')}>Large</div>
                                    </div>
                                </div>

                                <div className="dropdown mt-2">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="theme-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {`Font:`}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="theme-dropdown">
                                        <div className="dropdown-item" onClick={() => this.changefamily('-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')}>Default</div>
                                        <div className="dropdown-item" onClick={() => this.changefamily('Roboto')}>Roboto</div>
                                        <div className="dropdown-item" onClick={() => this.changefamily('\'Open Sans\', sans-serif')}>Sans</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {this.state.privacy&&(
                        <>

                            <div className={"col-md-10"}>
                                <div className={"div-border ml-4 mr-4"}>

                                    <h6 className={"card-title"}><b>Change Password</b></h6>
                                    <hr/>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: this.state.error ? "" : "none" }}
                                    >
                                        {this.state.error}
                                    </div>

                                    <div
                                        className="alert alert-success"
                                        style={{ display: this.state.changed ? "" : "none" }}
                                    >
                                        {this.state.changed}
                                    </div>


                                    <TextField className={"text"}
                                               type={"Password"}
                                               variant="outlined"
                                               margin="normal"
                                               fullWidth
                                               label="New Password"
                                               onChange={this.handleChange("password")}
                                    />
                                    <br/>

                                    <TextField className={"text"}
                                               type={"Password"}
                                               variant="outlined"
                                               margin="normal"
                                               fullWidth
                                               label="Confirm Password"
                                        onChange={this.handleChange("c_password")}
                                    />

                                    <br/>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.clickSubmit}
                                    >
                                        Change Password
                                    </Button>

                                </div>

                                <div className={"div-border  ml-4 mr-4 mt-4"}>
                                    <h6 className={"card-title"}><b>Ads Setting</b></h6>
                                    <hr/>
                                    <div className={"row"}>
                                        <div className={"col-md-4"}>
                                            <b>Show My Phone Number in ads</b>
                                        </div>

                                        <div className={"col-md-4"}>
                                        </div>

                                        <div className={"col-md-4"}>
                                            <FormControlLabel
                                                control={<Switch size="small" checked={this.state.AdsNumber} onChange={this.changeSetting} />}

                                            />
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </>
                    )}



                    {this.state.notifications&&(
                        <>

                            <div className={"col-md-10"}>

                                <div className={"div-border  ml-4 mr-4 mt-4"}>
                                    <h6 className={"card-title"}><b>Notifications</b></h6>
                                    <hr/>
                                    <div className={"row"}>
                                        <div className={"col-md-4"}>
                                            <b>Special Offers and Communications</b>
                                            <p className={"text-muted"}>Receive updates, offers, surveys and more

                                            </p>
                                        </div>

                                        <div className={"col-md-4"}>
                                        </div>

                                        <div className={"col-md-4"}>
                                            <FormControlLabel className={"ml-5"}
                                                              control={
                                                                  <Switch value="checkedA" />
                                                              }
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className={"row"}>
                                        <div className={"col-md-4"}>
                                            <b>Reccomendations</b>

                                            <p className={"text-muted"}>Based on your activity

                                            </p>
                                        </div>

                                        <div className={"col-md-4"}>
                                        </div>

                                        <div className={"col-md-4"}>
                                            <FormControlLabel className={"ml-5"}
                                                              control={
                                                                  <Switch value="checkedA" />
                                                              }
                                            />
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </>
                    )}


                </div>
            </div>
        );
    }
}

export default Settings;