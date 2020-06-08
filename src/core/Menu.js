import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth";
import logo from "../images/cblogo.png";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './menu.css';
import {MDBCol} from "mdbreact";

const isActive = (history, path)=> {
    if(history.location.pathname === path){
        return {color:"#c43b3b"};
    }
    else{
        return {color: "#ffffff"};
    }
};

const Menu = ({history}) =>(
    <div className={""}>
        <div className="secnav py-1">
            <div className={"container"}>

                <div><i className={"fa fa-phone mr-1"} aria-hidden="true"></i>03317354483</div>
                <div className={""}><i className="fa fa-envelope mr-1" aria-hidden="true"></i>info@carbazar.com</div>
                <div className={""}><i className="fa fa-address-book mr-1" aria-hidden="true"></i> CUI, Islamabad</div>




            </div>
        </div>


        <div>
            <nav className="navbar navbar-expand-lg navbar-inverse bg-dark">
                <div className={"container"}>
                    <a className="navbar-brand" href="/" >
                        <img src={logo} style={{width: '100px', height: "50px"}} alt="CarBazaar"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link className="nav-link" style =  {isActive(history, "/")} to={"/"}>Home </Link>
                            </li>





                            <li className="nav-item dropdown">
                                <a style={{color: "#FFFFFF"}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Post Ads
                                </a>
                                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">

                                    <li className="nav-item">
                                        <Link className="nav-link" style =  {isActive(history, "/post/create")} to={"/post/create"}> Seller Ad </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" style =  {isActive(history, "/post/create_buyer")} to={"/post/create_buyer"}>Buyer Ad </Link>
                                    </li>
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style =  {isActive(history, "/BuyerPosts")} to={"/BuyerPosts"}>Find Buyers </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a style={{color: "#FFFFFF"}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    New Cars
                                </a>
                                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">

                                    <li className="nav-item">
                                        <Link className="nav-link" style =  {isActive(history, "/car/review")} to={"/car/review"}>
                                            <i className="fa fa-comments mr-2"></i> Reviews </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" style =  {isActive(history, "/car/recommendations")} to={"/car/recommendations"}>
                                            <i className="fa fa-thumbs-up mr-2"></i> Car Recommendations </Link>
                                    </li>

                                </div>
                            </li>

                            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                                <li className="nav-item">
                                    <Link
                                        to={`/admin`}
                                        style={isActive(history, `/admin`)}
                                        className="nav-link"
                                    >
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link className="nav-link" style =  {isActive(history, "/contact-us")} to={"/contact-us"}>Contact Us </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className={"fa fa-user"} aria-hidden="true"></i>
                                </a>
                                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                    {isAuthenticated()&&(
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`}
                                                      style = {isActive(history, `/user/${isAuthenticated().user._id}`)}>
                                                    <i className="fa fa-user mr-1" aria-hidden="true"></i>

                                                    {`${isAuthenticated().user.name}'s Profile`}
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link"
                                                      onClick={()=>signout(()=> history.push("/"))}>
                                                    <i className="fa fa-sign-out mr-1" aria-hidden="true"></i>
                                                    Signout
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link className="nav-link" style =  {isActive(history, "/userSetting")} to={"/userSetting"}>
                                                    <i className="fa fa-sliders mr-1" aria-hidden="true"></i>
                                                    Settings </Link>
                                            </li>

                                        </>
                                    )}

                                    {!isAuthenticated ()&& (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" style = {isActive(history, "/signin")} to={"/signin"}>
                                                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                                                      Signin </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" style = {isActive(history, "/signup")}to={"/signup"}>
                                                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                                                    Signup </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" style = {isActive(history, "/signup_dealer")}to={"/signup_dealer"}>
                                                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                                                    Signup Dealer </Link>
                                            </li>
                                        </>
                                    )}



                                </div>
                            </li>

                            {!isAuthenticated ()&& (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" style =  {isActive(history, "/signin")} to={"/signin"}>Sign in </Link>
                                    </li>

                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    </div>

);

export default withRouter(Menu);

