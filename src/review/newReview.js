import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {getMake, getModel, getVariant} from "../Post/apiPost";
import Rating from '@material-ui/lab/Rating';
import TextField from "@material-ui/core/TextField";
import BeautyStars from 'beauty-stars';
import {MDBInput} from "mdbreact";
import {createReview, like, dislike} from "./apiReview"
import {isAuthenticated} from "../auth";
class NewReview extends Component {


    constructor(){
        super();
        this.state = {

            makefound: [],
            modelfound: [],
            vfound: [],
            error : "",
            make: "",
            model: "",
            version: "",
            familiarity: "",
            brandReview: "3",
            mileageReview: "3",
            modelReview: "3",
            priceReview: "3",
            description: "",
            title: ""

        }
    }


    isvalid = () =>{



        if(this.state.make.length === 0 ){
            this.setState({error: "Select Make"});
            return false;
        }
        if(this.state.model.length === 0 ){
            this.setState({error: "Select Model"});
            return false;
        }

        if(this.state.version.length === 0 ){
            this.setState({error: "Select year"});
            return false;
        }

        if(this.state.title.length === 0 ){
            this.setState({error: "Title Required"});
            return false;
        }
        if(this.state.title.description === 0 ){
            this.setState({error: "Description Required"});
            return false;
        }
        if(this.state.title.familiarity === 0 ){
            this.setState({error: "Select Familiarity"});
            return false;
        }
        return true;

    };


    handleChange = (name) => event => {
        this.setState({ error: "" });
        this.setState({ model: event.target.value });

        getVariant(event.target.value).then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({vfound: data});


            }
        })

    };

    handleyear = (name) => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });


    };



    handleMake = (name) => event => {
        this.setState({error: ""});

        const value = name === 'photo'? event.target.files[0] : event.target.value;


        this.setState({ [name]:  value});

        getModel(this.state.make).then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({modelfound: data});

            }
        })
    };

    componentDidMount() {

        getMake().then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({makefound: data});
            }
        })

    }

    clickSubmit = event => {
        event.preventDefault();
        const { make, model, version, title, description, priceReview, modelReview, brandReview, mileageReview, familiarity} = this.state;
        const user_id = isAuthenticated().user._id;
        const username = isAuthenticated().user.name;

        const review = {
            make,
            model,
            version,
            title,
            description,
            priceReview,
            modelReview,
            brandReview,
            mileageReview,
            familiarity,
            user_id,
            username
        };

        if(this.isvalid()){
            createReview(review).then(data => {
                if(data.error)
                    this.setState({error: data.error, loading: false});
                else{
                    console.log("created");
                }
            })
        }


    };

    likecar = event => {
        event.preventDefault();
        const { make, model, version} = this.state;
        const userId = isAuthenticated().user._id;

        const review = {
            make,
            model,
            version,
            userId,
        };

            like(review).then(data => {
                if(data.error)
                    this.setState({error: data.error, loading: false});
                else{
                    console.log("liked");
                }
            })



    };

    dislikecar = event => {
        event.preventDefault();
        const { make, model, version} = this.state;
        const userId = isAuthenticated().user._id;

        const review = {
            make,
            model,
            version,
            userId,
        };

        dislike(review).then(data => {
            if(data.error)
                this.setState({error: data.error, loading: false});
            else{
                console.log("disliked");
            }
        })



    };

    render() {
        return (
            <div>
                <div className={"mt-5 container"}>
                    <h4 className={"mb-2"}>Write Review</h4>
                    <div className={"card"} style={{
                        "box-shadow": "0 4px 8px 0 rgba(0.1,0.1,0.1,0.1)"}}>
                        <div className={"card-body"}>
                            <div
                                className="alert alert-danger"
                                style={{ display: this.state.error ? "" : "none" }}
                            >
                                {this.state.error}
                            </div>
                            <h5 className={"mt-2"}>Car Information</h5>


                            <div className={"row mt-4"}>
                                <div className={"col-sm-6"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Select Make</InputLabel>
                                </div>
                                <div className={"col-sm-6"}>
                                    <Select
                                        style={{width:'50%'}}
                                        labelId="make"
                                        id="make"
                                        value={this.state.make}
                                        onChange={this.handleMake("make")}
                                    >
                                        <MenuItem value={""} disabled={true} selected={true}>Select make</MenuItem>
                                        {this.state.makefound.map((make)=> <MenuItem value={make._id}>{make._id}</MenuItem>)}
                                    </Select>
                                </div>

                                <div className={"col-sm-6 mt-3"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Select Model</InputLabel>
                                </div>
                                <div className={"col-sm-6 mt-3"}>
                                    <Select
                                        style={{width:'50%'}}
                                        labelId="model"
                                        id="model"
                                        onOpen={this.handleMake("model")}
                                        value={this.state.model}
                                        onChange={this.handleChange("model")}
                                    >
                                        <MenuItem value={""} disabled={true} selected={true}>First select make</MenuItem>
                                        {this.state.modelfound.map((model)=> <MenuItem value={model._id}>{model._id}</MenuItem>)}
                                    </Select>
                                </div>


                                <div className={"col-sm-6 mt-3"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Select Year</InputLabel>
                                </div>
                                <div className={"col-sm-6 mt-3"}>
                                    <Select
                                        style={{width:'50%'}}
                                        labelId="model"
                                        id="model"
                                        value={this.state.version}
                                        onChange={this.handleyear("version")}
                                    >
                                        <MenuItem value={""} disabled={true} selected={true}>First select make</MenuItem>
                                        {this.state.vfound.map((model)=> <MenuItem value={model.version}>{model.version}</MenuItem>)}
                                    </Select>
                                </div>


                            </div>
                            <hr/>

                            <h4 className={"mb-2"}>Your Opinion</h4>


                            <div className={"row mt-4"}>
                                <div className={"col-sm-6"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Brand</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <BeautyStars
                                        value={this.state.brandReview}
                                        onChange={value => this.setState({brandReview: value })}
                                    />
                                </div>
                            </div>


                            <div className={"row mt-2"}>
                                <div className={"col-sm-6"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Price</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <BeautyStars
                                        value={this.state.priceReview}
                                        onChange={value => this.setState({priceReview: value })}
                                    />
                                </div>
                            </div>

                            <div className={"row mt-2"}>
                                <div className={"col-sm-6"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Model</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <BeautyStars
                                        value={this.state.modelReview}
                                        onChange={value => this.setState({modelReview: value })}
                                    />
                                </div>
                            </div>



                            <div className={"row mt-2"}>
                                <div className={"col-sm-6"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Mileage</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <BeautyStars
                                        value={this.state.mileageReview}
                                        onChange={value => this.setState({mileageReview: value })}
                                    />
                                </div>
                            </div>

                            <div className={"row mt-2"}>
                                <div className={"col-sm-6 mt-2"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Review Title</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        label="Review Title"
                                        onChange={this.handleyear("title")}
                                    />
                                </div>
                            </div>

                            <div className={"row mt-2"}>
                                <div className={"col-sm-6 mt-2"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Describe</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <MDBInput
                                        style={ {width: '50%'}}
                                        type="textarea"
                                        rows="7"
                                        value={this.state.body}
                                        onChange={this.handleyear("description")}
                                    />
                                </div>
                            </div>

                            <div className={"row mt-2"}>
                                <div className={"col-sm-6 mt-2"}>
                                    <InputLabel style={{'position': 'absolute',
                                        'right': '100px',
                                        'top': '5px'}} className={"mt-2"} id="make">Familarity</InputLabel>
                                </div>

                                <div className={"col-sm-6 mt-2"}>
                                    <Select
                                        style={{width:'50%'}}
                                        value={this.state.familiarity}
                                        onChange={this.handleyear("familiarity")}
                                    >
                                        <MenuItem value={"I owned this car"}>I owned this car</MenuItem>
                                        <MenuItem value={"I drove this car"}>I drove this car</MenuItem>
                                        <MenuItem value={"I never owned neither drove this car"}>I never owned neither drove this car</MenuItem>
                                    </Select>
                                </div>
                            </div>

                            <div className={"row mt-2"}>
                                <div className={"col-sm-6 mt-5"}>

                                </div>

                                <div className={"col-sm-6 mt-5"}>

                                    <button type="button" className="btn btn-raised btn-danger mt-2" data-toggle="modal"
                                            data-target="#exampleModal" onClick={this.clickSubmit}>
                                        Submit Review
                                    </button>


                                    {/*likemodal*/}

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Overall Impression</h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>We would like your final impression about this car!</p>
                                                    <div className={"row"}>

                                                        <div className={"col-sm-6"}>
                                                            <button onClick={this.likecar} style={{'position': 'absolute',
                                                                'right': '10px',
                                                                }} type="button" className="btn btn-success" data-dismiss="modal"><i
                                                                className="fa fa-thumbs-up"></i>
                                                            </button>
                                                        </div>
                                                        <div className={"col-sm-6"}>
                                                            <button onClick={this.dislikecar} type="button" className="btn btn-danger" data-dismiss="modal"><i
                                                                className="fa fa-thumbs-down"></i>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>


                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default NewReview;