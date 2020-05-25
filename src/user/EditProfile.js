import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update, updateAuthUser} from "./apiUser";
import {Redirect} from "react-router-dom";
import User_Avatar from "../images/User_Avatar.png";


class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            id : "",
            name: "",
            phone: "",
            password: "",
            redirectToProfile: false,
            error : "",
            loading: false,
            fileSize :0,
            about : ""
        }
    }

    handleChange = (name) => event => {
        this.setState({error: ""});
        const value = name === 'photo'? event.target.files[0] : event.target.value;

         this.state.fileSize = name === 'photo'? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]:  value});
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading :true});
        if(this.isvalid()){
            const token = isAuthenticated().token;
            const userId= this.props.match.params.userId;

            update(userId, token, this.userData)
                .then(data=> {
                    if(data.error)
                        this.setState({error: data.error});
                    else if (isAuthenticated().user.role === "admin") {
                        this.setState({
                            redirectToProfile: true
                        });
                    }
                    else {
                        updateAuthUser(data, ()=>{
                            this.setState({
                                redirectToProfile: true
                            })
                        });

                    }
                })

        }
    };

    init = (userid) => {
        const token = isAuthenticated().token;

        read(userid, token)
            .then(data => {
                if(data.error){
                    this.setState({redirectToProfile: true});
                }
                else{
                    console.log(data);
                    this.setState({id : data._id,
                        name: data.name,
                        about: data.about,
                        phone:data.phone});
                }
            });
    };

    componentDidMount() {
        this.userData = new FormData();
        const userid= this.props.match.params.userId;
        this.init(userid);
    }
    isvalid = () =>{
        const {name, password, fileSize, phone} = this.state;




        if(name.length <=3){

            this.setState({error: "Name must be atleast three characters!", loading :false})
            return false;
        }
        if(password.length >=1 && password.length<8){
            this.setState({error: "password must be atleast 8 characters", loading :false});
            return false;
        }
        if(!/^((\(((\+|00)92)\)|(\+|00)92)(( |\-)?)(3[0-9]{2})\6|0(3[0-9]{2})( |\-)?)[0-9]{3}( |\-)?[0-9]{4}$/.test(phone)){
            this.setState({error: "Invalid phone", loading: false});
            return false;
        }
        return true;

    }
    render() {


        if(this.state.redirectToProfile){
            return <Redirect to={"/user/"+this.state.id}/>
        }

        const photourl = this.state.id? "http://localhost:8080/user/photo/"+this.state.id+"?"+new Date().getTime() : `${User_Avatar}`;

        return (

            <div className={"container"}>
                <h2 className="mt-5 mb-5">Edit Profile</h2>


                <div
                    className="alert alert-danger"
                    style={{ display: this.state.error ? "" : "none" }}
                >
                    {this.state.error}
                </div>


                {this.state.loading? <div className={"jumbotron"}>
                    <h2>Loading..</h2>
                </div>: ""}

                <img className={"img-thumbnail"} src={photourl} alt={this.state.name} style={{width: 'auto' , height : "200px"}}
                     onError={i => (i.target.src = `${User_Avatar}`)}
                />

                <form>

                    <div className="form-group">
                        <label className="text-muted">Profile Photo</label>
                        <input
                            className="form-control"
                            type="file"
                            accept={"image/*"}
                            onChange={this.handleChange("photo")}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            value={this.state.name}
                            className="form-control"
                            type="text"
                            onChange={this.handleChange("name")}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About</label>
                        <input
                            value={this.state.about}
                            className="form-control"
                            type="text"
                            onChange={this.handleChange("about")}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Phone</label>
                        <input
                            value={this.state.phone}
                            className="form-control"
                            type="tel"
                            onChange={this.handleChange("phone")}
                        />
                    </div>


                    <div className="form-group">
                        <button
                            onClick={this.clickSubmit}
                            className="btn btn-raised btn-primary"
                        >
                            UPDATE
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProfile;