import React, {Component} from 'react';
import {authenticate, isAuthenticated} from "../auth";
import {getMake, getModel, getVariant} from "../Post/apiPost";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {searchReviews} from "./apiReview"
import {civic} from "../images/slider.jpg"
import User_Avatar from "../images/User_Avatar.png";
import Rating from "@material-ui/lab/Rating";

class Review extends Component {

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
            reviews: [],
            searched :false

        }
    }


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

    handleyear = (name) => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });


    };

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
        return true;

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

        if(this.isvalid()){
            searchReviews(this.state.make, this.state.model, this.state.version).then(data => {
                if(data.error)
                    this.setState({error: data.error});
                else{
                    this.setState({reviews: data})
                    this.setState({searched: true});
                }
            })
        }

    };

    render() {
        return (
            <div>
                <div className={"container mt-5"}>


                    <div className={"card mt-5"}>
                        <div style={{display:"flex"}} className={"card-body"}>
                            <img style={{width: '48px', height: '52px'}} src="https://wsa2.pakwheels.com/assets/write-974f4a10d6e3c050e460aaf9ddc7c221.svg" alt=""/>
                            <p className={"mt-3 ml-2"}>Share first hand experince of your car with other buyers.</p>


                            <a style={{'height': '40px' , 'position': 'absolute',
                                'right': '50px',
                                'top': '25px'}} className="btn btn-raised btn-danger mt-2 ml-5" href={"/car/new_review"}>
                                Write Review
                            </a>


                        </div>
                    </div>

                    <h4 className={"mt-5"}>Search Car Reviews</h4>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <div
                                className="alert alert-danger"
                                style={{ display: this.state.error ? "" : "none" }}
                            >
                                {this.state.error}
                            </div>
                            <div className={"row"}>


                                <div className={"col-md-3"}>
                                    <InputLabel className={"mt-2"} id="make">Select Make</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="make"
                                        id="make"
                                        value={this.state.make}
                                        onChange={this.handleMake("make")}
                                    >
                                        <MenuItem value={""} disabled={true} selected={true}>Select make</MenuItem>
                                        {this.state.makefound.map((make)=> <MenuItem value={make._id}>{make._id}</MenuItem>)}
                                    </Select>
                                </div>
                                <div className={"col-md-3"}>

                                    <InputLabel className={"mt-2"} id="model">Select Model</InputLabel>
                                    <Select
                                        fullWidth
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


                                <div className={"col-md-3"}>
                                    <InputLabel className={"mt-2"}>Select Version</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="model"
                                        id="model"
                                        value={this.state.version}
                                        onChange={this.handleyear("version")}
                                    >
                                        <MenuItem value={""} disabled={true} selected={true}>First select model</MenuItem>
                                        {this.state.vfound.map((model)=> <MenuItem value={model.version}>{model.version}</MenuItem>)}
                                    </Select>
                                </div>


                                <div className={"col-md-3 mt-3"}>
                                    <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger" onClick={this.clickSubmit}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                    {this.state.searched && (
                        <div className={"mt-5"}>
                            <div>
                                <h5>{this.state.reviews[0].make.toUpperCase() + " " +this.state.reviews[0].model.toUpperCase() +" " +this.state.reviews[0].version} CAR REVIEWS</h5>
                            </div>
                            <hr/>
                            {console.log(this.state.reviews[0].comments)}
                            <div className={"card"}>
                                <div className={"card-body"}>
                                    {this.state.reviews[0].comments.map((post,i)=>{


                                        return (


                                            <div>


                                                <div className="card mt-2"  key={i} >

                                                    <div className="card-body" style={{"border-left": "5px solid #233d7b"}}>

                                                        <div className={"row"}>
                                                            <div className={"col-md-2"}>
                                                                <img className={"card-img-top mx-auto"} src={`https://cache3.pakwheels.com/system/car_generation_pictures/2534/original/1.jpg?1433403768`} style={{
                                                                    height: "100px",
                                                                    "width": "auto",
                                                                    "max-width": "100%"
                                                                }}
                                                                     onError={i => (i.target.src = `${User_Avatar}`)}
                                                                />
                                                            </div>
                                                            <div className={"col-md-10"}>
                                                                <p style={{'font-size': 'large', 'font-weight': '700', 'color': '#233d7b'}}>{post.title}</p>
                                                                <p className={"text-muted mt-0"}>{this.state.reviews[0].make.toUpperCase() + " " +this.state.reviews[0].model.toUpperCase() +" " +this.state.reviews[0].version}</p>
                                                                <p className={"text-muted mt-0"}>Familiarity : {post.familiarity}</p>
                                                                <p className={"text-muted mt-0"}>Review by : {post.author.username}</p>
                                                            </div>

                                                        </div>

                                                        <div className={"mt-1"}>
                                                            <i className="fa fa-quote-left mr-1"></i> {post.description}
                                                            <i className="fa fa-quote-right ml-1"></i>
                                                        </div>

                                                        <div className={"row mt-3"}>
                                                            <div className={"col-sm-3"}>
                                                                <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Brand</p>
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <Rating name="size-large" defaultValue={post.brandReview} disabled={true} size="small" />
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Price Value</p>
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <Rating name="size-large" defaultValue={post.priceReview} disabled={true} size="small" />
                                                            </div>
                                                        </div>

                                                        <div className={"row mt-3"}>
                                                            <div className={"col-sm-3"}>
                                                                <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Mileage</p>
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <Rating name="size-large" defaultValue={post.mileageReview} disabled={true} size="small" />
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Model</p>
                                                            </div>

                                                            <div className={"col-sm-3"}>
                                                                <Rating name="size-large" defaultValue={post.modelReview} disabled={true} size="small" />
                                                            </div>
                                                        </div>





                                                    </div>

                                                </div>





                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    )}


                </div>
            </div>

        );
    }
}

export default Review;