import React, {Component} from 'react';
import './Guidelines.css'
import ar from "../images/porsche.jpg"

import ads from "../images/ads.jpg"

import ibm from "../images/chatbot.jpg"
class GudieLines extends Component {
    render() {
        return (
            <div>
                <div className={"header"}>
                    <div >
                        <div>
                            <h2  className={"header-font"}>Help & Guidelines</h2>
                            <div className={"row"}>
                                <div className={"col-md-4"}>

                                </div>
                                <div className={"col-md-4"} style={{'margin-left': '90px'}}>
                                    <ol  style={{'background-color' : '#fa9898'}} className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item"><a href="/userSetting">Settings</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">GuideLines</li>
                                    </ol>
                                </div>
                                <div className={"col-md-4"}>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={"container"}>
                    <div>
                        <div className={"models"}>
                            <div className={"row"}>
                                <div className={"col-sm-6"}>
                                    <h2><b>Reality Car Models</b></h2>
                                    <p>
                                        In android application of carbazar user get number of 3D car models that they can place in their own environment. To work with these models user have to follow some simple steps:
                                    </p>
                                    <ol>
                                        <li>Tap on View in AR tab.</li>
                                        <li>Select their desired model.</li>
                                        <li>Press view in AR button.</li>
                                    </ol>

                                    <p>
                                        And yes you're over there to get a real feel of your car in your own room or garage.
                                    </p>
                                    <p>Car Bazar gives you an ability to play with your dream car, you can adjust in your surroundings according to your needs.
                                        You're given simple looking buttons to zoom in, zoom out or move in real world as needed.
                                    </p>
                                </div>
                                <div className={"col-sm-6"}>
                                    <div style={{height: '5px', 'background-color': '#fa9898'}}>

                                    </div>
                                    <div className={"mt-2"}>
                                        <img className={"img-aside"} src={ar} alt="armodel"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"mt-2"}>
                        <div className={"models"}>
                            <div className={"row"}>
                                <div className={"col-sm-6"}>
                                    <div style={{height: '5px', 'background-color': '#fa9898'}}>

                                    </div>
                                    <div className={"mt-2"}>
                                        <img className={"img-aside"} src={ads} alt="armodel"/>
                                    </div>
                                </div>
                                <div className={"col-sm-6"}>
                                    <h2><b>Seller Ads</b></h2>
                                    <p>
                                        Seller ads in Car Bazar allows cars sellers to post what they want to show to the users out there. it helps them target a large audience. Car Bazar gives its users and 
                                        oppertunity to sell their cars by providing all the details they can.
                                        Car Bazar has an easy to understand user interface, through which it's easy for sellers to tell the buyers what they want to sell, and for buyers all information on one place.
                                    </p>
                                    <p>
                                        To post a seller ad, you can:
                                    </p>
                                    <ol>
                                        <li>Tap on the post an ad button.</li>
                                        <li>In the car information page add a suitable title</li>
                                        <li>Select your city(So that buyers can contact you only if you are the best possible approachable solution)</li>
                                        <li>Select the registration city of your car</li>
                                        <li>Select the year of make</li>
                                        <li>Select how many miles are driven on this car(If you are selling a used car)</li>
                                        <li>Select the exterior paint color of the car</li>
                                        <li>Add the price you are demaning</li>
                                        <li>A little description about this car model</li>
                                        <li>Upload as many pictures of your loving car(An optional video can also be added)</li>

                                <p>
                                    In the additional Information panel, you can also add:
                                </p>
                                        <li>Select the engine type</li>
                                        <li>Select transmission(Automated or manual)</li>
                                        <li>Select the assembly of your car model</li>
                                        <li>Select engine capacity in cc</li>
                                    </ol>
                                    <p>
                                       Press on the post button and there you go ;) your ad will be posted to the audience out there in seconds.
                                    </p>
                                    <p>While posting an ad you must be aware of the policies of Car Bazar in case of fake ad you might get your account banned permanently.</p>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className={"mt-2"}>
                        <div className={"models"}>
                            <div className={"row"}>

                                <div className={"col-sm-6"}>
                                    <h2><b>ChatMe</b></h2>
                                    <p>
                                        Car Bazar provides the solution for all of your problems while selling or buying of the cars.
                                        Car bazar has a 24/7 available virtual reprentative to answer all of your queries within seconds. You can ask anything from it, and get the result within seconds of Frequently asked questions.
                                    </p>
                                    <p>
                                        Car Bazar chatMe can give information regarding any problem you might face while you are stuck in the usage of system, and also information regarding any car from the trusted sources.
                                    </p>
                                </div>

                                <div className={"col-sm-6"}>
                                    <div style={{height: '5px', 'background-color': '#fa9898'}}>

                                    </div>
                                    <div className={"mt-2"}>
                                        <img className={"img-aside"} src={ibm} alt="armodel"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"mt-2"}>
                        <div className={"models"}>
                            <div className={"row"}>

                                <div className={"col-sm-6"}>
                                    <div style={{height: '5px', 'background-color': '#fa9898'}}>

                                    </div>
                                    <div className={"mt-2"}>
                                        <img className={"img-aside"} src={ibm} alt="armodel"/>
                                    </div>
                                </div>

                                <div className={"col-sm-6"}>
                                    <h2><b>Want a Demo?</b></h2>
                                    <p>
                                        Watch this usability video if you still need any help.
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default GudieLines;