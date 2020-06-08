import React, {Component} from 'react';
import {bestmodel, bestbrand, bestMileage, bestPrice} from "./apiRecommender";
import User_Avatar from "../images/User_Avatar.png";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";

class Recommender extends Component {
    constructor(){
        super();
        this.state = {
            result: [],
            open: false,
            min: 0,
            max: 0,
        };
    }

    handleChange = (search) => event => {


        this.setState({ [search]: event.target.value });


    };


    clickSubmit = event => {
        event.preventDefault();

        bestmodel().then(data=> {
            if(data.error){
                console.log("error");
            }
            else {
                this.setState({result: data});
                this.setState({open: true});
            }
        })




    };

    clickSubmitBrand = event => {
        event.preventDefault();

        bestbrand().then(data=> {
            if(data.error){
                console.log("error");
            }
            else {
                this.setState({result: data});
                this.setState({open: true});
            }
        })




    };



    clickSubmitMilegae = event => {
        event.preventDefault();

        bestMileage().then(data=> {
            if(data.error){
                console.log("error");
            }
            else {
                this.setState({result: data});
                this.setState({open: true});
            }
        })




    };

    clickSubmitPrice = event => {
        event.preventDefault();
        const min = this.state.min;
        const max = this.state.max;
        bestPrice(min, max).then(data=> {
            if(data.error){
                console.log("error");
            }
            else {
                this.setState({result: data});
                this.setState({open: true});
            }
        })




    };

    render() {
        return (
            <div>
                <div className={"container mt-5"}>
                    <div className={"card mt-5"}>
                        <div style={{display:"flex"}} className={"card-body"}>
                            <img style={{width: '48px', height: '52px'}} src="https://wsa2.pakwheels.com/assets/write-974f4a10d6e3c050e460aaf9ddc7c221.svg" alt=""/>
                            <p className={"mt-3 ml-2"}>Our recommendations are based on the reviews that are provided by the Carbazar users on different cars</p>
                            <br/>

                            <a style={{'height': '40px' , 'position': 'absolute',
                                'right': '50px',
                                'top': '25px'}} className="btn btn-raised btn-danger mt-2 ml-5" href={"/car/new_review"}>
                                Write Review
                            </a>

                        </div>
                    </div>

                    <h4 className={"mt-5"}>Find Recommendations</h4>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h6 className={"card-title"}>What do you need?</h6>
                            <div className={"row"}>
                                <div className={"col-sm-4"}>
                                    <button style={{ 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger ml-5" onClick={this.clickSubmit}>
                                        Best Model
                                    </button>
                                </div>
                                <div className={"col-sm-4"}>

                                    <button style={{ 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger ml-5" onClick={this.clickSubmitBrand}>
                                        Best Brand/Make
                                    </button>

                                </div>
                                <div className={"col-sm-4"}>
                                    <button style={{ 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger ml-5" onClick={this.clickSubmitMilegae}>
                                        Best Mileage
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <div className={"row"}>
                                <div className={"col-md-4"}>
                                    <TextField
                                        type={"number"}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="min"
                                        label="min"
                                        name="min"
                                        value={this.state.min}
                                        onChange={this.handleChange("min")}
                                    />
                                </div>

                                <div className={"col-md-4"}>

                                    <TextField
                                        type={"number"}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="max"
                                        label="max"
                                        name="max"
                                        value={this.state.max}
                                        onChange={this.handleChange("max")}
                                    />
                                </div>

                                <div className={"col-md-4 mt-3"}>
                                    <button style={{ 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger ml-5" onClick={this.clickSubmitPrice}>
                                        Price
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.open && this.state.result[0] !== undefined && (


                        <div className={"mt-5"}>
                            <h5>Recommended Car</h5>
                            <hr/>

                            <div className={"card"}>
                                <div className={"card-body"}>

                                    <div>


                                        <div className="card mt-2" >

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

                                                        <p className={"text-muted mt-0"}>{this.state.result[0].car[0].make.toUpperCase() + " " +this.state.result[0].car[0].model.toUpperCase() +" " +this.state.result[0].car[0].version}</p>
                                                        <p className={"text-muted mt-0"}>Likes : {this.state.result[0].car[0].likes.length}</p>
                                                        <p className={"text-muted mt-0"}>Dislikes : {this.state.result[0].car[0].dislikes.length}</p>
                                                        <p className={"text-muted mt-0"}>Total Reviews : {this.state.result[0].car[0].comments.length}</p>

                                                    </div>

                                                </div>


                                                <div className={"row mt-3"}>
                                                    <div className={"col-sm-3"}>
                                                        <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Brand</p>
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <Rating name="size-large" defaultValue={this.state.result[0].brand_avg} disabled={true} size="small" />
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Price Value</p>
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <Rating name="size-large" defaultValue={this.state.result[0].price_avg} disabled={true} size="small" />
                                                    </div>
                                                </div>

                                                <div className={"row mt-3"}>
                                                    <div className={"col-sm-3"}>
                                                        <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Mileage</p>
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <Rating name="size-large" defaultValue={this.state.result[0].mileage_avg} disabled={true} size="small" />
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <p style={{'font-size': 'small', 'font-weight': '600', 'color': '#233d7b'}}>Model</p>
                                                    </div>

                                                    <div className={"col-sm-3"}>
                                                        <Rating name="size-large" defaultValue={this.state.result[0].model_avg} disabled={true} size="small" />
                                                    </div>
                                                </div>





                                            </div>

                                        </div>





                                    </div>


                                </div>
                            </div>

                        </div>
                    )}



                </div>
            </div>
        );
    }
}

export default Recommender;