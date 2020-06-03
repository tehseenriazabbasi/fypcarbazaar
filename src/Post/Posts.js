import React, {Component} from 'react';
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners"
import Iframe from 'react-iframe'
import {
    list,
    listolx,
    listolxhome,
    searchOlx,
    searchCarBazar,
    listSavedByUser,
    listPKWhome,
    searchPKW,
    getModel,
    getMake,
    searchCbFilters,
    listPKMhome,
    searchPKM,
    searchOlxFilters,
    searchPKWFilters,
    searchPKMFilters,
    list_buyerPosts
} from "./apiPost";
import {Link} from 'react-router-dom';
import User_Avatar from "../images/User_Avatar.png";
import {isAuthenticated} from "../auth";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import './posts.css';
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../images/CAR BAZAAR.png";
import slider2 from "../images/CAR BAZAAR (1).png";
import slider3 from "../images/CAR BAZAAR (2).png";
import ReactPaginate from 'react-paginate';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Posts extends Component {

    constructor(){
        super();
        this.state= {
            posts: [],
            postData: [],
            offset: 0,
            perPage: 3,
            currentPage: 0,
            pageCount: 0,
            b_posts: [],
            olxposts: [],
            olxhomeposts: [],
            olxoffset: 0,
            olxperPage: 3,
            olxcurrentPage: 0,

            pkwhomeposts:[],
            pkwoffset: 0,
            pkwperPage: 3,
            pkwcurrentPage: 0,



            pkmhomeposts:[],
            pkmoffset: 0,
            pkmperPage: 3,
            pkmcurrentPage: 0,

            saved:[],
            search: "",
            searchResultsolx:[],
            searchResultspkw:[],
            searchResultspkm:[],
            searchResultcarbazar: [],
            searched : false,
            loading: false,
            loadingolx: false,
            loadingpkw: false,
            loadingpkm: false,
            modelfound:[],
            makefound: [],
            min :"",
            max: "",
            location : "",
            reg_city: "",
            make : "",
            model : "",
            transmission : "",
            kms_driven: "",
            engine_type : "",
            year_from : "",
            year_to : "",
            error: "",
            condition: "",
            exterior_color: "",
            engine_capacity: "",
            iframe: false

        }
    }

    handleMake = (name) => event => {
        this.setState({error: ""});

        const value = name === 'photo'? event.target.files[0] : event.target.value;

        const fileSize = name === 'photo'? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]:  value, fileSize});

        getModel(this.state.make).then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({modelfound: data});
            }
        })
    };

    isValid=() =>{



        if(this.state.min == "" && this.state.max != ""){
            this.setState({min: 0});
        }

        if(this.state.min != "" && this.state.max != "" && this.state.max<this.state.min){
            this.setState({error: "Price:Maximum cannot be less than minimum"});
            return false;
        }

        if(this.state.min != "" && this.state.max == ""){
            this.setState({error: "Price: Enter Maximum"});
            return false;
        }

        return true;
    };

    isYearValid = () =>{
        if(this.state.year_from != "" && this.state.year_to != "" && this.state.year_from > this.state.year_to){
            this.setState({error: "Year:From cannot be greater then To"});
            return false;
        }



        if(this.state.year_from != "" && this.state.year_to == ""){
            this.setState({error: "Year:To must also be selected"});
            return false;
        }

        if(this.state.year_from == "" && this.state.year_to != ""){
            this.setState({error: "Year:From must also be selected"});
            return false;
        }

        return true;
    };

    handleChange = (search) => event => {

        this.setState({error: ""});
        this.setState({ [search]: event.target.value });
        /*searchCarBazarfilter(this.state.reg_city).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({searchResultcarbazar:data})
                this.setState({searched: true});
            }
        })*/

    };

    loadsavedPosts = (userId) => {
        const token = isAuthenticated().token;
        listSavedByUser(userId, token).then( data => {
            if(data.error){
                console.log(data);
                console.log(data.error);
            }
            else {
                console.log({data});
                this.setState({saved: data});
            }
        })
    };


    clickSubmit = event => {
        event.preventDefault();
            this.setState({loading :true});
            this.setState({loadingolx :true});
            this.setState({loadingpkw :true});
            this.setState({loadingpkm :true});


            searchPKM(this.state.search).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultspkm: data});
                    this.setState({searched: true});
                    this.setState({loading: false});
                    this.setState({loadingpkm: false});
                }
            });

            searchOlx(this.state.search).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultsolx: data});
                    this.setState({searched: true});
                    this.setState({loading: false});
                    this.setState({loadingolx: false});
                }
            });

            searchPKW(this.state.search).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultspkw: data});
                    this.setState({searched: true});
                    this.setState({loading: false});
                    this.setState({loadingpkw: false});
                }
            });

            searchCarBazar(this.state.search).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultcarbazar: data});
                    this.setState({searched: true});
                }
            });



    };

    searchFilters = event => {
        event.preventDefault();

        if(this.isValid() && this.isYearValid()){
            this.setState({loading :true});

            searchOlxFilters(this.state.make, this.state.model, this.state.kms_driven, this.state.engine_type, this.state.min, this.state.max, this.state.reg_city, this.state.year_from, this.state.year_to, this.state.exterior_color, this.state.transmission, this.state.condition)
                .then(data =>{
                    if(data.error){
                        console.log(data.error);
                    }
                    else {
                        this.setState({searchResultsolx: data});
                        this.setState({searched: true});
                        this.setState({loading: false});
                    }
                });

            searchPKWFilters(this.state.make, this.state.model, this.state.kms_driven, this.state.engine_type, this.state.min, this.state.max, this.state.reg_city, this.state.year_from, this.state.year_to, this.state.location, this.state.exterior_color, this.state.transmission, this.state.condition).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultspkw: data});
                    this.setState({searched: true});
                    this.setState({loading: false});
                }
            });


            searchPKMFilters(this.state.make, this.state.model, this.state.kms_driven, this.state.engine_type, this.state.min, this.state.max, this.state.reg_city, this.state.year_from, this.state.year_to, this.state.location, this.state.exterior_color, this.state.transmission, this.state.condition).then(data =>{
                if(data.error){
                    console.log(data.error);
                }
                else {
                    this.setState({searchResultspkm: data});
                    this.setState({searched: true});
                    this.setState({loading: false});
                }
            });

        }


        searchCbFilters(this.state.make, this.state.model, this.state.kms_driven, this.state.engine_type, this.state.min, this.state.max, this.state.reg_city, this.state.year_from, this.state.year_to, this.state.location, this.state.exterior_color, this.state.condition, this.state.transmission, this.state.engine_capacity).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({searchResultcarbazar: data});
                this.setState({searched: true});
                this.setState({loading: false});
            }
        });


        /*searchCarBazar(this.state.search).then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({searchResultcarbazar: data});
                this.setState({searched: true});
            }
        });*/



    };

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    pkwhandlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.pkwperPage;

        this.setState({
            pkwcurrentPage: selectedPage,
            pkwoffset: offset
        }, () => {
            this.pkwreceivedData();
        });

    };
    olxhandlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.olxperPage;

        this.setState({
            olxcurrentPage: selectedPage,
            olxoffset: offset
        }, () => {
            this.olxreceivedData();
        });

    };

    pkmhandlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.pkmperPage;

        this.setState({
            pkmcurrentPage: selectedPage,
            pkmoffset: offset
        }, () => {
            this.pkmreceivedData();
        });

    };



    receivedData() {
        list().then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({posts: data});
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                })

                this.setState({loading: false});
            }
        })

    }


    pkwreceivedData() {
        listPKWhome().then(data =>{

            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({pkwhomeposts: data});
                this.setState({
                    pkwpageCount: Math.ceil(32  / this.state.pkwperPage),

                });

                this.setState({loadingpkw: false});


            }
        });

    }


    olxreceivedData() {
        listolxhome().then(data =>{

            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({olxhomeposts: data});
                this.setState({
                    olxpageCount: Math.ceil(20  / this.state.olxperPage),

                });
                this.setState({loadingolx: false});

            }
        });

    }


    pkmreceivedData() {
        listPKMhome().then(data =>{

            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({pkmhomeposts: data});
                this.setState({
                    pkmpageCount: Math.ceil(9 / this.state.pkmperPage),

                });
                this.setState({loadingpkm: false});

            }
        });

    }

    componentDidMount() {
        console.log("local", localStorage.getItem("jwt"));
        if(localStorage.getItem("jwt") != null){
            const userId = isAuthenticated().user._id;
            this.loadsavedPosts(userId);
        }
        this.postData = new FormData();
        this.setState({loading:true})
        this.setState({loadingolx:true})
        this.setState({loadingpkw:true})
        this.setState({loadingpkm:true})
        getMake().then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({makefound: data});
            }
        });

        this.receivedData();

       this.olxreceivedData();

        this.pkwreceivedData();

        this.pkmreceivedData();
    }


    renderCarBazaarhome= (posts, saved) => {
        return (
            <div className="card">
                <div className={"card-body"} >
                    <h6 className={"card-title"}>Car Bazaar Home</h6>
                    <hr/>

                    {this.state.loading && (
                        <div style={{'margin': '50px', 'height': '100px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={15}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loading}
                            />
                        </div>
                    )}
                    <div className="row">
                        {posts.slice(this.state.offset, this.state.offset + this.state.perPage).map((post,i)=>{

                            const posterId = post.postedBy? post.postedBy._id : "";
                            const posterName = post.postedBy? post.postedBy.name : "";
                            const posterRole = post.postedBy? post.postedBy.role : "";
                            var check =false;
                            for (var j =0; j< saved.length; j++){
                                if(saved[j]._id === post[1]._id ){
                                    check= true;
                                }
                                console.log(check);
                            }

                            return (


                                <div className={"col-sm-4"}>


                                        <a style={{height: '408px'}} className="card card-post mt-2"  key={i} href={`/post/${post[1]._id}`} target={
                                            "_blank"}>

                                            <div className="card-body" style={{"border-left": "5px solid yellow"}}>

                                                <div style={{"text-align": "center"}}>
                                                    <img className={"card-img-top mx-auto"} src={post[1].photo[0]} alt={post.title} style={{
                                                        height: "200px",
                                                        "width": "auto",
                                                        "max-width": "100%"
                                                    }}
                                                         onError={i => (i.target.src = `${User_Avatar}`)}
                                                    />
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-md-10 mt-2"}>
                                                        <h5 className="card-title font-weight-bold mb-0">{"Rs "+post[1].price}</h5>
                                                        <p className="card-text text-muted">  {post[1].title}</p>
                                                        <p className="card-text mb-0"> {post[1].make + " " + post[1].model+ " "+ post[1].registration_city + " " +  post[1].registration_year}</p>
                                                        <p className="card-text mb-0"> {post[1].mileage  + "Kms " + post[1].engine_capacity+ " "+ post[1].engine_type}</p>
                                                        <p className="card-text text-muted"> {post[1].city}</p>
                                                    </div>

                                                    <div className={"col-md-2 mt-2"}>
                                                        {isAuthenticated() && isAuthenticated().user._id !== post[1].postedBy._id && !check? (

                                                            <div>
                                                                <Link to={`/savePost/${post[1]._id}`}>  <i
                                                                    className="fa fa-heart-o fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i> </Link>
                                                            </div>
                                                        ): ("")}

                                                        {isAuthenticated() && isAuthenticated().user._id !== post[1].postedBy._id && check? (

                                                            <div>
                                                                <Link to={`/unsavePost/${post[1]._id}`}><i
                                                                    className="fa fa-heart fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i></Link>
                                                            </div>
                                                        ): ("")}
                                                    </div>
                                                </div>






                                            </div>

                                        </a>





                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        )
    };


    renderCarBazaardealers= (posts, saved) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Car Bazaar Dealers</h6>
                    <hr/>

                    {this.state.loading && (
                        <div style={{'margin': '50px', 'height': '100px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={15}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loading}
                            />
                        </div>
                    )}
                    <div className="row">
                        {posts.map((post,i)=>{

                            const posterId = post.postedBy? post.postedBy._id : "";
                            const posterName = post.postedBy? post.postedBy.name : "";
                            const posterRole = post.postedBy? post.postedBy.role : "";
                            var check =false;
                            for (var j =0; j< saved.length; j++){
                                if(saved[j]._id === post[1]._id ){
                                    check= true;
                                }
                                console.log(check);
                            }

                            return (


                                <div className={"col-sm-4"}>


                                    <a style={{height: '408px'}} className="card card-post mt-2"  key={i} href={`/post/${post[1]._id}`} target={
                                        "_blank"}>

                                        <div className="card-body" style={{"border-left": "5px solid yellow"}}>

                                            <div style={{"text-align": "center"}}>
                                                <img className={"card-img-top mx-auto"} src={post[1].photo[0]} alt={post.title} style={{
                                                    height: "200px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }}
                                                     onError={i => (i.target.src = `${User_Avatar}`)}
                                                />
                                            </div>
                                            <div className={"row"}>
                                                <div className={"col-md-10 mt-2"}>
                                                    <h5 className="card-title font-weight-bold mb-0">{"Rs "+post[1].price}</h5>
                                                    <p className="card-text text-muted">  {post[1].title}</p>
                                                    <p className="card-text mb-0"> {post[1].make + " " + post[1].model+ " "+ post[1].registration_city + " " +  post[1].registration_year}</p>
                                                    <p className="card-text mb-0"> {post[1].mileage  + "Kms " + post[1].engine_capacity+ " "+ post[1].engine_type}</p>
                                                    <p className="card-text text-muted"> {post[1].city}</p>
                                                </div>

                                                <div className={"col-md-2 mt-2"}>
                                                    {isAuthenticated() && isAuthenticated().user._id !== post[1].postedBy._id && !check? (

                                                        <div>
                                                            <Link to={`/savePost/${post[1]._id}`}>  <i
                                                                className="fa fa-heart-o fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i> </Link>
                                                        </div>
                                                    ): ("")}

                                                    {isAuthenticated() && isAuthenticated().user._id !== post[1].postedBy._id && check? (

                                                        <div>
                                                            <Link to={`/unsavePost/${post[1]._id}`}><i
                                                                className="fa fa-heart fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i></Link>
                                                        </div>
                                                    ): ("")}
                                                </div>
                                            </div>

                                        </div>

                                    </a>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        )
    };






    renderCarBazaarPostsHorizontal= (posts, saved) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>CarBazaar Search Results</h6>
                    <hr/>
                        {posts.map((post,i)=>{

                            const posterId = post.postedBy? post.postedBy._id : "";
                            const posterName = post.postedBy? post.postedBy.name : "";
                            var check =false;
                            for (var j =0; j< saved.length; j++){
                                if(saved[j]._id === post._id ){
                                    check= true;
                                }
                            }

                            return (
                                <a className="card card-post mt-2"  key={i} href={`/post/${post._id}`} target={
                                    "_blank"}>
                                    <div style={{"text-align": "center"}}>
                                        <img className={"card-img-top mx-auto"} src={post.photo[0]} alt={post.title} style={{
                                            height: "200px",
                                            "width": "auto",
                                            "max-width": "100%"
                                        }}
                                             onError={i => (i.target.src = `${User_Avatar}`)}
                                        />
                                    </div>
                                    <div className="card-body" style={{"border-left": "5px solid yellow"}}>
                                        <h5 className="card-title font-weight-bold mb-0">{"Rs "+post.price}</h5>
                                        <p className="card-text text-muted">  {post.title}</p>
                                        <p className="card-text mb-0"> {post.make + " " + post.model+ " "+ post.registration_city + " " +  post.registration_year}</p>
                                        <p className="card-text mb-0"> {post.mileage  + "Kms " + post.engine_capacity+ " "+ post.engine_type}</p>
                                        <p className="card-text text-muted"> {post.city}</p>

                                        <div className={"row"}>
                                            <div className={"col-md-2 mt-2"}>
                                                {isAuthenticated() && isAuthenticated().user._id !== post.postedBy._id && !check? (

                                                    <div>
                                                        <Link to={`/savePost/${post._id}`}>  <i
                                                            className="fa fa-heart-o fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i> </Link>
                                                    </div>
                                                ): ("")}

                                                {isAuthenticated() && isAuthenticated().user._id !== post.postedBy._id && check? (

                                                    <div>
                                                        <Link to={`/unsavePost/${post._id}`}><i
                                                            className="fa fa-heart fa-2x" style={{'color': 'red'}}  aria-hidden="true"></i></Link>
                                                    </div>
                                                ): ("")}
                                            </div>
                                        </div>


                                    </div>

                                </a>
                            )
                        })}
                    </div>
                </div>


        )
    };



    renderOlxPosts= (posts) => {
        return (
            <div className="card card-div">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Olx Home</h6>
                    <hr/>
                    {this.state.loadingolx && (
                        <div style={{'margin': '50px', 'height': '100px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={15}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loadingolx}
                            />
                        </div>
                    )}
                    <div className="card-columns">
                    {posts.slice(this.state.olxoffset, this.state.olxoffset + this.state.olxperPage).map((post,i)=>{
                        return (
                            <a  className="card card-post"  key={i} href={post[1][0].Link}  target={
                                "_blank"}>

                                <div className="card-body" style={{'height': '380px', "border-left": "5px solid yellow"}}>
                                    <div className={"mb-2"} style={{"text-align": "center"}}>
                                        <img className={"card-img-top mx-auto"} src={post[1][0].Image} alt={post[1][0].title} style={{
                                            height: "200px",
                                            "width": "auto",
                                            "max-width": "100%"
                                        }}
                                             onError={i => (i.target.src = `${User_Avatar}`)}
                                        />
                                    </div>

                                    <h5 className="card-title font-weight-bold mb-0">{post[1][0].Price}</h5>
                                    <p className="card-text mb-0"> {post[1][0].Details}</p>
                                    <p className="card-text text-muted"> {post[1][0].Title}</p>
                                    <p className="card-text text-muted"> {post[1][0].Location}</p>
                                </div>

                            </a>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    };


    renderPKWhomePosts= (posts) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Pak-Wheels Home</h6>
                    <hr/>
                    {this.state.loadingpkw && (
                        <div style={{'margin': '50px', 'height': '100px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={15}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loadingpkw}
                            />
                        </div>
                    )}
                    <div className="card-columns">
                        {posts.slice(this.state.pkwoffset, this.state.pkwoffset + this.state.pkwperPage).map((post,i)=>{
                            return (
                                <a className="card card-post"  key={i} href={post[1].link} target={
                                    "_blank"}>

                                    <div className="card-body" style={{"border-left": "5px solid yellow", 'height': '440px'}}>
                                        <div className={"mb-2"} style={{"text-align": "center"}}>
                                            <img className={"card-img-top mx-auto"} src={post[1].image} alt={post[1].title} style={{
                                                height: "200px",
                                                "width": "auto",
                                                "max-width": "100%"
                                            }}
                                                 onError={i => (i.target.src = `${User_Avatar}`)}
                                            />
                                        </div>

                                        <h5 className="card-title font-weight-bold mb-0">{post[1].price}</h5>
                                        <p className="card-text text-muted"> {post[1].title}</p>
                                        <p className="card-text mb-0"> {post[1].engineCapacity + " " + post[1].engineType+ " "+ post[1].transmission + " " +  post[1].running + " - " +post[1].year}</p>
                                        <p className="card-text text-muted"> {post[1].city}</p>
                                        <p className="card-text text-muted"> {"Rating:  "+ post[1].rating}</p>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    };


    renderPKMhomePosts= (posts) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>PK-Motors Home</h6>
                    <hr/>
                    {this.state.loadingpkm && (
                        <div style={{'margin': '50px', 'height': '100px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={15}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loadingpkm}
                            />
                        </div>
                    )}

                    <div className="card-columns">
                        {posts.slice(this.state.pkmoffset, this.state.pkmoffset + this.state.pkmperPage).map((post,i)=>{
                            return (
                                <a className="card card-post"  key={i} href={post[1].link} target={
                                    "_blank"}>



                                    <div className="card-body" style={{"border-left": "5px solid yellow", "height": '416px'}}>

                                        {post[1].image != null && (
                                            <div className={"mb-2"} style={{"text-align": "center"}}>
                                                <img className={"card-img-top mx-auto"} src={post[1].image} alt={post[1].title} style={{
                                                    height: "200px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }}
                                                     onError={i => (i.target.src = `${User_Avatar}`)}
                                                />
                                            </div>
                                        )}

                                        {post[1].image == null && (
                                            <div  className={"mb-2"} style={{"text-align": "center"}}>
                                                <img className={"card-img-top mx-auto"} src={User_Avatar} alt={post[1].title} style={{
                                                    height: "200px",
                                                    "width": "auto",
                                                    "max-width": "100%"
                                                }}
                                                     onError={i => (i.target.src = `${User_Avatar}`)}
                                                />
                                            </div>
                                        )}

                                        <h5 className="card-title font-weight-bold mb-0">{post[1].price}</h5>
                                        <p className="card-text text-muted"> {post[1].title}</p>
                                        <p className="card-text mb-0"> {post[1].Make + " " + post[1].Model+ " "+ post[1].RegistrationCity + " " +  post[1].Year + " - " +post[1].Transmission}</p>
                                        <p className="card-text text-muted"> {post[1].city}</p>
                                        <p className="card-text text-muted"> {"Insurance:  "+ post[1].Insurance}</p>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    };


    renderOlxPostsHorizontal= (posts) => {
        return (

            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Olx Search Results</h6>

                    {this.state.loadingolx && (
                        <div style={{'margin': '50px', 'height': '400px' , 'align-items' : 'center', 'display': 'flex'}}>

                        <SyncLoader
                            css={override}
                            size={25}
                            //size={"150px"} this also works
                            color={"#c43b3b"}
                            loading={this.state.loadingolx}
                        />
                    </div>
                    )}
                    <hr/>
                        {posts.map((post,i)=>{
                            return (
                                <a className="card card-post mb-2"  key={i} href={post[1][0].Link} target={
                                    "_blank"}>
                                    <div style={{"text-align": "center"}}>
                                        <img className={"card-img-top mx-auto"} src={post[1][0].Image} alt={post[1][0].title} style={{
                                            height: "200px",
                                            "width": "auto",
                                            "max-width": "100%"
                                        }}
                                             onError={i => (i.target.src = `${User_Avatar}`)}
                                        />
                                    </div>
                                    <div className="card-body" style={{"border-left": "5px solid yellow"}}>
                                        <h5 className="card-title font-weight-bold mb-0">{post[1][0].Price}</h5>
                                        <p className="card-text mb-0"> {post[1][0].Details}</p>
                                        <p className="card-text text-muted"> {post[1][0].Title}</p>
                                        <p className="card-text text-muted"> {post[1][0].Location}</p>
                                    </div>
                                </a>
                            )
                        })}
                </div>
            </div>
        )
    };


    renderPKWPostsHorizontal= (posts) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Pak-Wheels Search Results</h6>
                    <hr/>
                    {this.state.loadingpkw && (
                        <div style={{'margin': '50px', 'height': '400px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={25}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loadingpkw}
                            />
                        </div>
                    )}

                    {posts.map((post,i)=>{
                        return (
                            <a className="card card-post mb-2"  key={i} href={post[1].link} target={
                                "_blank"}>
                                <div style={{"text-align": "center"}}>
                                    <img className={"card-img-top mx-auto"} src={post[1].image} alt={post[1].title} style={{
                                        height: "200px",
                                        "width": "auto",
                                        "max-width": "100%"
                                    }}
                                         onError={i => (i.target.src = `${User_Avatar}`)}
                                    />
                                </div>
                                <div className="card-body" style={{"border-left": "5px solid yellow"}}>
                                    <h5 className="card-title font-weight-bold mb-0">{post[1].price}</h5>
                                    <p className="card-text text-muted"> {post[1].title}</p>
                                    <p className="card-text mb-0"> {post[1].engineCapacity + " " + post[1].engineType+ " "+ post[1].transmission + " " +  post[1].running + " - " +post[1].year}</p>
                                    <p className="card-text text-muted"> {post[1].city}</p>
                                    <p className="card-text text-muted"> {"Rating:  "+ post[1].rating}</p>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        )
    };

    renderPKMPostsHorizontal= (posts) => {
        return (
            <div className="card">
                <div className={"card-body"}>
                    <h6 className={"card-title"}>Pk-Motors Search Results</h6>
                    <hr/>

                    {this.state.loadingpkm && (
                        <div style={{'margin': '50px', 'height': '400px' , 'align-items' : 'center', 'display': 'flex'}}>

                            <SyncLoader
                                css={override}
                                size={25}
                                //size={"150px"} this also works
                                color={"#c43b3b"}
                                loading={this.state.loadingpkm}
                            />

                        </div>
                    )}
                    {posts.map((post,i)=>{
                        return (
                            <a className="card card-post mb-2"  key={i} href={post[1].link} target={
                                "_blank"}>

                                {post[1].image != null && (
                                    <div style={{"text-align": "center"}}>
                                        <img className={"card-img-top mx-auto"} src={post[1].image} alt={post[1].title} style={{
                                            height: "200px",
                                            "width": "auto",
                                            "max-width": "100%"
                                        }}
                                             onError={i => (i.target.src = `${User_Avatar}`)}
                                        />
                                    </div>
                                )}

                                {post[1].image == null && (
                                    <div style={{"text-align": "center"}}>
                                        <img className={"card-img-top mx-auto"} src={User_Avatar} alt={post[1].title} style={{
                                            height: "200px",
                                            "width": "auto",
                                            "max-width": "100%"
                                        }}
                                             onError={i => (i.target.src = `${User_Avatar}`)}
                                        />
                                    </div>
                                )}

                                <div className="card-body" style={{"border-left": "5px solid yellow"}}>
                                    <h5 className="card-title font-weight-bold mb-0">{post[1].price}</h5>
                                    <p className="card-text text-muted"> {post[1].title}</p>
                                    <p className="card-text mb-0"> {post[1].Make + " " + post[1].Model+ " "+ post[1].RegistrationCity + " " +  post[1].Year + " - " +post[1].Transmission}</p>
                                    <p className="card-text text-muted"> {post[1].city}</p>
                                    <p className="card-text text-muted"> {"Insurance:  "+ post[1].Insurance}</p>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        )
    };



    render() {

        const olxhome =[];
        const olxsearch =[];

        const pkhome =[];
        const pkwsearch=[];
        const cbposts =[];
        const cbpostsdealers =[];
        const pkmhome =[];
        const pkmsearch =[];
        const {posts, b_posts ,saved, olxhomeposts, searchResultsolx, searchResultcarbazar, pkwhomeposts, searchResultspkw ,pkmhomeposts , searchResultspkm} = this.state;


        for(var i in posts){
            if(posts[i].postedBy.role != 'dealer')
                cbposts.push([i,posts [i]]);
        }
        for(var i in posts){
            if(posts[i].postedBy.role == 'dealer')
                cbpostsdealers.push([i,posts [i]]);
        }


        for(var i in olxhomeposts)
            olxhome.push([i,olxhomeposts [i]]);


        for(var i in searchResultsolx)
            olxsearch.push([i,searchResultsolx [i]]);

        for(var i in pkwhomeposts)
            pkhome.push([i,pkwhomeposts [i]]);

        for(var i in searchResultspkw)
            pkwsearch.push([i,searchResultspkw [i]]);


        for(var i in pkmhomeposts)
            pkmhome.push([i,pkmhomeposts [i]]);


        for(var i in searchResultspkm)
            pkmsearch.push([i,searchResultspkm [i]]);

        return (

            <div>
                {this.state.searched ?  (
                    <div>

                        { this.state.loading ? (
                            <div style={{'margin': '50px', 'height': '400px' , 'align-items' : 'center', 'display': 'flex'}}>
                                <SyncLoader
                                    css={override}
                                    size={25}
                                    //size={"150px"} this also works
                                    color={"#c43b3b"}
                                    loading={this.state.loading}
                                />
                            </div>


                        ): (
                            <div className={"mt-2"}>

                                <div className={"container"}>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: this.state.error ? "" : "none" }}
                                    >
                                        {this.state.error}
                                    </div>
                                    <div className={"card"} style={{"box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                        <div className={"card-body"}>

                                            <div className={"row"}>
                                                <div className={"col-md-3"}>

                                                    <h6>Price</h6>
                                                    <div className={"row"}>
                                                        <div className={"col-md-6"}>
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
                                                        <div className={"col-md-6"}>
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
                                                    </div>


                                                </div>
                                                <div className={"col-md-3"}>

                                                    <h6 className={"mt-3"}>Location</h6>
                                                    <div>
                                                        <InputLabel id="make">Select City</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="location"
                                                            id="location"
                                                            value={this.state.location}
                                                            onChange={this.handleChange("location")}
                                                        >
                                                            <MenuItem value="" disabled= {true} selected={true}>Select The City</MenuItem>
                                                            <MenuItem value="Islamabad">Islamabad</MenuItem>
                                                            <MenuItem value="" disabled= {true}>Punjab Cities</MenuItem>
                                                            <MenuItem value="Ahmed Nager Chatha">Ahmed Nager Chatha</MenuItem>
                                                            <MenuItem value="Ahmadpur East">Ahmadpur East</MenuItem>
                                                            <MenuItem value="Ali Khan Abad">Ali Khan Abad</MenuItem>
                                                            <MenuItem value="Alipur">Alipur</MenuItem>
                                                            <MenuItem value="Arifwala">Arifwala</MenuItem>
                                                            <MenuItem value="Attock">Attock</MenuItem>
                                                            <MenuItem value="Bhera">Bhera</MenuItem>
                                                            <MenuItem value="Bhalwal">Bhalwal</MenuItem>
                                                            <MenuItem value="Bahawalnagar">Bahawalnagar</MenuItem>
                                                            <MenuItem value="Bahawalpur">Bahawalpur</MenuItem>
                                                            <MenuItem value="Bhakkar">Bhakkar</MenuItem>
                                                            <MenuItem value="Burewala">Burewala</MenuItem>
                                                            <MenuItem value="Chillianwala">Chillianwala</MenuItem>
                                                            <MenuItem value="Chakwal">Chakwal</MenuItem>
                                                            <MenuItem value="Chichawatni">Chichawatni</MenuItem>
                                                            <MenuItem value="Chiniot">Chiniot</MenuItem>
                                                            <MenuItem value="Chishtian">Chishtian</MenuItem>
                                                            <MenuItem value="Daska">Daska</MenuItem>
                                                            <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                                                            <MenuItem value="Dera Ghazi Khan">Dera Ghazi Khan</MenuItem>
                                                            <MenuItem value="Dhaular">Dhaular</MenuItem>
                                                            <MenuItem value="Dina">Dina</MenuItem>
                                                            <MenuItem value="Dinga">Dinga</MenuItem>
                                                            <MenuItem value="Dipalpur">Dipalpur</MenuItem>
                                                            <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                                                            <MenuItem value="Fateh Jhang">Fateh Jang</MenuItem>
                                                            <MenuItem value="Ghakhar Mandi">Ghakhar Mandi</MenuItem>
                                                            <MenuItem value="Gojra">Gojra</MenuItem>
                                                            <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                                                            <MenuItem value="Gujrat">Gujrat</MenuItem>
                                                            <MenuItem value="Gujar Khan">Gujar Khan</MenuItem>
                                                            <MenuItem value="Hafizabad">Hafizabad</MenuItem>
                                                            <MenuItem value="Haroonabad">Haroonabad</MenuItem>
                                                            <MenuItem value="Hasilpur">Hasilpur</MenuItem>
                                                            <MenuItem value="Haveli">Haveli</MenuItem>
                                                            <MenuItem value="Lakha">Lakha</MenuItem>
                                                            <MenuItem value="Jalalpur">Jalalpur</MenuItem>
                                                            <MenuItem value="Jattan">Jattan</MenuItem>
                                                            <MenuItem value="Jampur">Jampur</MenuItem>
                                                            <MenuItem value="Jaranwala">Jaranwala</MenuItem>
                                                            <MenuItem value="Jhang">Jhang</MenuItem>
                                                            <MenuItem value="Jhelum">Jhelum</MenuItem>
                                                            <MenuItem value="Kalabagh">Kalabagh</MenuItem>
                                                            <MenuItem value="Karor Lal Esan">Karor Lal Esan</MenuItem>
                                                            <MenuItem value="Kasur">Kasur</MenuItem>
                                                            <MenuItem value="Kamalia">Kamalia</MenuItem>
                                                            <MenuItem value="Kamoke">Kamoke</MenuItem>
                                                            <MenuItem value="Khanewal">Khanewal</MenuItem>
                                                            <MenuItem value="Khanpur">Khanpur</MenuItem>
                                                            <MenuItem value="Kharian">Kharian</MenuItem>
                                                            <MenuItem value="Khushab">Khushab</MenuItem>
                                                            <MenuItem value="Kot Adu">Kot Adu</MenuItem>
                                                            <MenuItem value="Jauharabad">Jauharabad</MenuItem>
                                                            <MenuItem value="Lahore">Lahore</MenuItem>
                                                            <MenuItem value="Lalamusa">Lalamusa</MenuItem>
                                                            <MenuItem value="Layyah">Layyah</MenuItem>
                                                            <MenuItem value="Liaquat Pur">Liaquat Pur</MenuItem>
                                                            <MenuItem value="Lodhran">Lodhran</MenuItem>
                                                            <MenuItem value="Malakwal">Malakwal</MenuItem>
                                                            <MenuItem value="Mamoori">Mamoori</MenuItem>
                                                            <MenuItem value="Mailsi">Mailsi</MenuItem>
                                                            <MenuItem value="Mandi Bahauddin">Mandi Bahauddin</MenuItem>
                                                            <MenuItem value="mian Channu">Mian Channu</MenuItem>
                                                            <MenuItem value="Mianwali">Mianwali</MenuItem>
                                                            <MenuItem value="Multan">Multan</MenuItem>
                                                            <MenuItem value="Murree">Murree</MenuItem>
                                                            <MenuItem value="Muridke">Muridke</MenuItem>
                                                            <MenuItem value="Mianwali Bangla">Mianwali Bangla</MenuItem>
                                                            <MenuItem value="Muzaffargarh">Muzaffargarh</MenuItem>
                                                            <MenuItem value="Narowal">Narowal</MenuItem>
                                                            <MenuItem value="Okara">Okara</MenuItem>
                                                            <MenuItem value="Renala Khurd">Renala Khurd</MenuItem>
                                                            <MenuItem value="Pakpattan">Pakpattan</MenuItem>
                                                            <MenuItem value="Pattoki">Pattoki</MenuItem>
                                                            <MenuItem value="Pir Mahal">Pir Mahal</MenuItem>
                                                            <MenuItem value="Qaimpur">Qaimpur</MenuItem>
                                                            <MenuItem value="Qila Didar Singh">Qila Didar Singh</MenuItem>
                                                            <MenuItem value="Rabwah">Rabwah</MenuItem>
                                                            <MenuItem value="Raiwind">Raiwind</MenuItem>
                                                            <MenuItem value="Rajanpur">Rajanpur</MenuItem>
                                                            <MenuItem value="Rahim Yar Khan">Rahim Yar Khan</MenuItem>
                                                            <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                                                            <MenuItem value="Sadiqabad">Sadiqabad</MenuItem>
                                                            <MenuItem value="Safdarabad">Safdarabad</MenuItem>
                                                            <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                                                            <MenuItem value="Sangla Hill">Sangla Hill</MenuItem>
                                                            <MenuItem value="Sarai Alamgir">Sarai Alamgir</MenuItem>
                                                            <MenuItem value="Sargodha">Sargodha</MenuItem>
                                                            <MenuItem value="Shakargarh">Shakargarh</MenuItem>
                                                            <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                                                            <MenuItem value="Sialkot">Sialkot</MenuItem>
                                                            <MenuItem value="Sohawa">Sohawa</MenuItem>
                                                            <MenuItem value="Soianwala">Soianwala</MenuItem>
                                                            <MenuItem value="Siranwali">Siranwali</MenuItem>
                                                            <MenuItem value="Talagang">Talagang</MenuItem>
                                                            <MenuItem value="Taxila">Taxila</MenuItem>
                                                            <MenuItem value="Toba Tek  Singh">Toba Tek Singh</MenuItem>
                                                            <MenuItem value="Vehari">Vehari</MenuItem>
                                                            <MenuItem value="Wah Cantonment">Wah Cantonment</MenuItem>
                                                            <MenuItem value="Wazirabad">Wazirabad</MenuItem>
                                                            <MenuItem value="" disabled= {true}>Sindh Cities</MenuItem>
                                                            <MenuItem value="Badin">Badin</MenuItem>
                                                            <MenuItem value="Bhirkan">Bhirkan</MenuItem>
                                                            <MenuItem value="Rajo Khanani">Rajo Khanani</MenuItem>
                                                            <MenuItem value="Chak">Chak</MenuItem>
                                                            <MenuItem value="Dadu">Dadu</MenuItem>
                                                            <MenuItem value="Digri">Digri</MenuItem>
                                                            <MenuItem value="Diplo">Diplo</MenuItem>
                                                            <MenuItem value="Dokri">Dokri</MenuItem>
                                                            <MenuItem value="Ghotki">Ghotki</MenuItem>
                                                            <MenuItem value="Haala">Haala</MenuItem>
                                                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                                            <MenuItem value="Islamkot">Islamkot</MenuItem>
                                                            <MenuItem value="Jacobabad">Jacobabad</MenuItem>
                                                            <MenuItem value="Jamshoro">Jamshoro</MenuItem>
                                                            <MenuItem value="Jungshahi">Jungshahi</MenuItem>
                                                            <MenuItem value="Kandhkot">Kandhkot</MenuItem>
                                                            <MenuItem value="Kandiaro">Kandiaro</MenuItem>
                                                            <MenuItem value="Karachi">Karachi</MenuItem>
                                                            <MenuItem value="Kashmore">Kashmore</MenuItem>
                                                            <MenuItem value="Keti Bandar">Keti Bandar</MenuItem>
                                                            <MenuItem value="Khairpur">Khairpur</MenuItem>
                                                            <MenuItem value="Kotri">Kotri</MenuItem>
                                                            <MenuItem value="Larkana">Larkana</MenuItem>
                                                            <MenuItem value="Matiari">Matiari</MenuItem>
                                                            <MenuItem value="Mehar">Mehar</MenuItem>
                                                            <MenuItem value="Mirpur Khas">Mirpur Khas</MenuItem>
                                                            <MenuItem value="Mithani">Mithani</MenuItem>
                                                            <MenuItem value="Mithi">Mithi</MenuItem>
                                                            <MenuItem value="Mehrabpur">Mehrabpur</MenuItem>
                                                            <MenuItem value="Moro">Moro</MenuItem>
                                                            <MenuItem value="Nagarparkar">Nagarparkar</MenuItem>
                                                            <MenuItem value="Naudero">Naudero</MenuItem>
                                                            <MenuItem value="Naushahro Feroze">Naushahro Feroze</MenuItem>
                                                            <MenuItem value="Naushara">Naushara</MenuItem>
                                                            <MenuItem value="Nawabshah">Nawabshah</MenuItem>
                                                            <MenuItem value="Nazimabad">Nazimabad</MenuItem>
                                                            <MenuItem value="Qambar">Qambar</MenuItem>
                                                            <MenuItem value="Qasimabad">Qasimabad</MenuItem>
                                                            <MenuItem value="Ranipur">Ranipur</MenuItem>
                                                            <MenuItem value="Ratodero">Ratodero</MenuItem>
                                                            <MenuItem value="Rohri">Rohri</MenuItem>
                                                            <MenuItem value="Sakrand">Sakrand</MenuItem>
                                                            <MenuItem value="Sanghar">Sanghar</MenuItem>
                                                            <MenuItem value="Shahbandar">Shahbandar</MenuItem>
                                                            <MenuItem value="Shahdadkot">Shahdadkot</MenuItem>
                                                            <MenuItem value="Shahdadpur">Shahdadpur</MenuItem>
                                                            <MenuItem value="Shahpur Chakar">Shahpur Chakar</MenuItem>
                                                            <MenuItem value="Shikarpaur">Shikarpaur</MenuItem>
                                                            <MenuItem value="Sukkur">Sukkur</MenuItem>
                                                            <MenuItem value="Tangwani">Tangwani</MenuItem>
                                                            <MenuItem value="Tando Adam Khan">Tando Adam Khan</MenuItem>
                                                            <MenuItem value="Tando Allahyar">Tando Allahyar</MenuItem>
                                                            <MenuItem value="Tando Muhammad Khan">Tando Muhammad Khan</MenuItem>
                                                            <MenuItem value="Thatta">Thatta</MenuItem>
                                                            <MenuItem value="Umerkot">Umerkot</MenuItem>
                                                            <MenuItem value="Warah">Warah</MenuItem>
                                                            <MenuItem value="" disabled= {true}>Khyber Cities</MenuItem>
                                                            <MenuItem value="Abbottabad">Abbottabad</MenuItem>
                                                            <MenuItem value="Adezai">Adezai</MenuItem>
                                                            <MenuItem value="Alpuri">Alpuri</MenuItem>
                                                            <MenuItem value="Akora Khattak">Akora Khattak</MenuItem>
                                                            <MenuItem value="Ayubia">Ayubia</MenuItem>
                                                            <MenuItem value="Banda Daud Shah">Banda Daud Shah</MenuItem>
                                                            <MenuItem value="Bannu">Bannu</MenuItem>
                                                            <MenuItem value="Batkhela">Batkhela</MenuItem>
                                                            <MenuItem value="Battagram">Battagram</MenuItem>
                                                            <MenuItem value="Birote">Birote</MenuItem>
                                                            <MenuItem value="Chakdara">Chakdara</MenuItem>
                                                            <MenuItem value="Charsadda">Charsadda</MenuItem>
                                                            <MenuItem value="Chitral">Chitral</MenuItem>
                                                            <MenuItem value="Daggar">Daggar</MenuItem>
                                                            <MenuItem value="Dargai">Dargai</MenuItem>
                                                            <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                                                            <MenuItem value="dera Ismail Khan">Dera Ismail Khan</MenuItem>
                                                            <MenuItem value="Doaba">Doaba</MenuItem>
                                                            <MenuItem value="Dir">Dir</MenuItem>
                                                            <MenuItem value="Drosh">Drosh</MenuItem>
                                                            <MenuItem value="Hangu">Hangu</MenuItem>
                                                            <MenuItem value="Haripur">Haripur</MenuItem>
                                                            <MenuItem value="Karak">Karak</MenuItem>
                                                            <MenuItem value="Kohat">Kohat</MenuItem>
                                                            <MenuItem value="Kulachi">Kulachi</MenuItem>
                                                            <MenuItem value="Lakki Marwat">Lakki Marwat</MenuItem>
                                                            <MenuItem value="Latamber">Latamber</MenuItem>
                                                            <MenuItem value="Madyan">Madyan</MenuItem>
                                                            <MenuItem value="Mansehra">Mansehra</MenuItem>
                                                            <MenuItem value="Mardan">Mardan</MenuItem>
                                                            <MenuItem value="Mastuj">Mastuj</MenuItem>
                                                            <MenuItem value="Mingora">Mingora</MenuItem>
                                                            <MenuItem value="Nowshera">Nowshera</MenuItem>
                                                            <MenuItem value="Paharpur">Paharpur</MenuItem>
                                                            <MenuItem value="Pabbi">Pabbi</MenuItem>
                                                            <MenuItem value="Peshawar">Peshawar</MenuItem>
                                                            <MenuItem value="Saidu Sharif">Saidu Sharif</MenuItem>
                                                            <MenuItem value="Shorkot">Shorkot</MenuItem>
                                                            <MenuItem value="Shewa Adda">Shewa Adda</MenuItem>
                                                            <MenuItem value="Swabi">Swabi</MenuItem>
                                                            <MenuItem value="Swat">Swat</MenuItem>
                                                            <MenuItem value="Tangi">Tangi</MenuItem>
                                                            <MenuItem value="Tank">Tank</MenuItem>
                                                            <MenuItem value="Thall">Thall</MenuItem>
                                                            <MenuItem value="Timergara">Timergara</MenuItem>
                                                            <MenuItem value="Tordher">Tordher</MenuItem>
                                                            <MenuItem value="" disabled= {true}>Balochistan Cities</MenuItem>
                                                            <MenuItem value="Awaran">Awaran</MenuItem>
                                                            <MenuItem value="Barkhan">Barkhan</MenuItem>
                                                            <MenuItem value="Chagai">Chagai</MenuItem>
                                                            <MenuItem value="Dera Bugti">Dera Bugti</MenuItem>
                                                            <MenuItem value="Gwadar">Gwadar</MenuItem>
                                                            <MenuItem value="Harnai">Harnai</MenuItem>
                                                            <MenuItem value="Jafarabad">Jafarabad</MenuItem>
                                                            <MenuItem value="Jhal Magsi">Jhal Magsi</MenuItem>
                                                            <MenuItem value="Kacchi">Kacchi</MenuItem>
                                                            <MenuItem value="Kalat">Kalat</MenuItem>
                                                            <MenuItem value="Kech">Kech</MenuItem>
                                                            <MenuItem value="Kharan">Kharan</MenuItem>
                                                            <MenuItem value="Khuzdar">Khuzdar</MenuItem>
                                                            <MenuItem value="Killa Abdullah">Killa Abdullah</MenuItem>
                                                            <MenuItem value="Killa Saifullah">Killa Saifullah</MenuItem>
                                                            <MenuItem value="Kohlu">Kohlu</MenuItem>
                                                            <MenuItem value="Lasbela">Lasbela</MenuItem>
                                                            <MenuItem value="Lehri">Lehri</MenuItem>
                                                            <MenuItem value="Loralai">Loralai</MenuItem>
                                                            <MenuItem value="Mastung">Mastung</MenuItem>
                                                            <MenuItem value="Musakhel">Musakhel</MenuItem>
                                                            <MenuItem value="Nasirabad">Nasirabad</MenuItem>
                                                            <MenuItem value="Nushki">Nushki</MenuItem>
                                                            <MenuItem value="Panjgur">Panjgur</MenuItem>
                                                            <MenuItem value="Pishin valley">Pishin Valley</MenuItem>
                                                            <MenuItem value="Quetta">Quetta</MenuItem>
                                                            <MenuItem value="Sherani">Sherani</MenuItem>
                                                            <MenuItem value="Sibi">Sibi</MenuItem>
                                                            <MenuItem value="Sohbatpur">Sohbatpur</MenuItem>
                                                            <MenuItem value="Washuk">Washuk</MenuItem>
                                                            <MenuItem value="Zhob">Zhob</MenuItem>
                                                            <MenuItem value="Ziarat">Ziarat</MenuItem>

                                                        </Select>
                                                    </div>

                                                </div>
                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Make</h6>
                                                    <div>
                                                        <InputLabel id="make">Select Make</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="make"
                                                            id="make"
                                                            value={this.state.make}
                                                            onChange={this.handleMake("make")}
                                                        >
                                                            {this.state.makefound.map((make)=> <MenuItem value={make._id}>{make._id}</MenuItem>)}
                                                        </Select>
                                                    </div>

                                                </div>
                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Model</h6>
                                                    <div>
                                                        <InputLabel id="model">Select Model</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="model"
                                                            id="model"
                                                            onOpen={this.handleMake("model")}
                                                            value={this.state.model}
                                                            onChange={this.handleChange("model")}
                                                        >
                                                            {this.state.modelfound.map((model)=> <MenuItem value={model._id}>{model._id}</MenuItem>)}
                                                        </Select>
                                                    </div>

                                                </div>

                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Condition</h6>
                                                    <div>
                                                        <InputLabel id="model">Select Condition</InputLabel>
                                                        <Select
                                                                fullWidth

                                                                value={this.state.condition}
                                                                onChange={this.handleChange("condition")}
                                                        >
                                                            <MenuItem value={"New"}>New</MenuItem>
                                                            <MenuItem value={"Used"}>Used</MenuItem>

                                                        </Select>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className={"row"}>

                                                <div className={"col-md-3"}>
                                                    <h6 className={"mt-3"}>Registration City</h6>
                                                    <div>
                                                        <InputLabel id="make">Select City</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="reg_city"
                                                            id="reg_city"
                                                            value={this.state.reg_city}
                                                            onChange={this.handleChange("reg_city")}
                                                        >
                                                            <MenuItem value={"islamabad"}>Islamabad</MenuItem>
                                                            <MenuItem value={"lahore"}>Lahore</MenuItem>
                                                            <MenuItem value={"multan"}>Multan</MenuItem>

                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <h6 className={"mt-3"}>Year</h6>
                                                    <div className={"row"}>
                                                        <div className={"col-md-6"}>
                                                            <InputLabel id="model">From</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                labelId="From"
                                                                id="year_from"
                                                                value={this.state.year_from}
                                                                onChange={this.handleChange("year_from")}
                                                            >
                                                                <MenuItem value={1971}>1970</MenuItem>
                                                                <MenuItem value={1972}>1971</MenuItem>
                                                                <MenuItem value={1973}>1972</MenuItem>
                                                                <MenuItem value={1974}>1973</MenuItem>
                                                                <MenuItem value={1975}>1974</MenuItem>
                                                                <MenuItem value={1976}>1975</MenuItem>
                                                                <MenuItem value={1977}>1976</MenuItem>
                                                                <MenuItem value={1978}>1978</MenuItem>
                                                                <MenuItem value={1979}>1979</MenuItem>
                                                                <MenuItem value={1980}>1980</MenuItem>
                                                                <MenuItem value={1981}>1981</MenuItem>
                                                                <MenuItem value={1982}>1982</MenuItem>
                                                                <MenuItem value={1983}>1983</MenuItem>
                                                                <MenuItem value={1984}>1984</MenuItem>
                                                                <MenuItem value={1985}>1985</MenuItem>
                                                                <MenuItem value={1986}>1986</MenuItem>
                                                                <MenuItem value={1987}>1987</MenuItem>
                                                                <MenuItem value={1988}>1988</MenuItem>
                                                                <MenuItem value={1989}>1989</MenuItem>
                                                                <MenuItem value={1990}>1990</MenuItem>
                                                                <MenuItem value={1991}>1991</MenuItem>
                                                                <MenuItem value={1992}>1992</MenuItem>
                                                                <MenuItem value={1993}>1993</MenuItem>
                                                                <MenuItem value={1994}>1994</MenuItem>
                                                                <MenuItem value={1995}>1995</MenuItem>
                                                                <MenuItem value={1996}>1996</MenuItem>
                                                                <MenuItem value={1997}>1997</MenuItem>
                                                                <MenuItem value={1998}>1998</MenuItem>
                                                                <MenuItem value={1999}>1999</MenuItem>
                                                                <MenuItem value={2000}>2000</MenuItem>
                                                                <MenuItem value={2001}>2001</MenuItem>
                                                                <MenuItem value={2002}>2002</MenuItem>
                                                                <MenuItem value={2003}>2003</MenuItem>
                                                                <MenuItem value={2004}>2004</MenuItem>
                                                                <MenuItem value={2005}>2005</MenuItem>
                                                                <MenuItem value={2006}>2006</MenuItem>
                                                                <MenuItem value={2007}>2007</MenuItem>
                                                                <MenuItem value={2008}>2008</MenuItem>
                                                                <MenuItem value={2009}>2009</MenuItem>
                                                                <MenuItem value={2010}>2010</MenuItem>
                                                                <MenuItem value={2011}>2011</MenuItem>
                                                                <MenuItem value={2012}>2012</MenuItem>
                                                                <MenuItem value={2013}>2013</MenuItem>
                                                                <MenuItem value={2014}>2014</MenuItem>
                                                                <MenuItem value={2015}>2015</MenuItem>
                                                                <MenuItem value={2016}>2016</MenuItem>
                                                                <MenuItem value={2017}>2017</MenuItem>
                                                                <MenuItem value={2018}>2018</MenuItem>
                                                                <MenuItem value={2019}>2019</MenuItem>
                                                                <MenuItem value={2020}>2020</MenuItem>

                                                            </Select>
                                                        </div>
                                                        <div className={"col-md-6"}>
                                                            <InputLabel id="model">To</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                labelId="To"
                                                                id="year_to"
                                                                value={this.state.year_to}
                                                                onChange={this.handleChange("year_to")}
                                                            >
                                                                <MenuItem value={1971}>1970</MenuItem>
                                                                <MenuItem value={1972}>1971</MenuItem>
                                                                <MenuItem value={1973}>1972</MenuItem>
                                                                <MenuItem value={1974}>1973</MenuItem>
                                                                <MenuItem value={1975}>1974</MenuItem>
                                                                <MenuItem value={1976}>1975</MenuItem>
                                                                <MenuItem value={1977}>1976</MenuItem>
                                                                <MenuItem value={1978}>1978</MenuItem>
                                                                <MenuItem value={1979}>1979</MenuItem>
                                                                <MenuItem value={1980}>1980</MenuItem>
                                                                <MenuItem value={1981}>1981</MenuItem>
                                                                <MenuItem value={1982}>1982</MenuItem>
                                                                <MenuItem value={1983}>1983</MenuItem>
                                                                <MenuItem value={1984}>1984</MenuItem>
                                                                <MenuItem value={1985}>1985</MenuItem>
                                                                <MenuItem value={1986}>1986</MenuItem>
                                                                <MenuItem value={1987}>1987</MenuItem>
                                                                <MenuItem value={1988}>1988</MenuItem>
                                                                <MenuItem value={1989}>1989</MenuItem>
                                                                <MenuItem value={1990}>1990</MenuItem>
                                                                <MenuItem value={1991}>1991</MenuItem>
                                                                <MenuItem value={1992}>1992</MenuItem>
                                                                <MenuItem value={1993}>1993</MenuItem>
                                                                <MenuItem value={1994}>1994</MenuItem>
                                                                <MenuItem value={1995}>1995</MenuItem>
                                                                <MenuItem value={1996}>1996</MenuItem>
                                                                <MenuItem value={1997}>1997</MenuItem>
                                                                <MenuItem value={1998}>1998</MenuItem>
                                                                <MenuItem value={1999}>1999</MenuItem>
                                                                <MenuItem value={2000}>2000</MenuItem>
                                                                <MenuItem value={2001}>2001</MenuItem>
                                                                <MenuItem value={2002}>2002</MenuItem>
                                                                <MenuItem value={2003}>2003</MenuItem>
                                                                <MenuItem value={2004}>2004</MenuItem>
                                                                <MenuItem value={2005}>2005</MenuItem>
                                                                <MenuItem value={2006}>2006</MenuItem>
                                                                <MenuItem value={2007}>2007</MenuItem>
                                                                <MenuItem value={2008}>2008</MenuItem>
                                                                <MenuItem value={2009}>2009</MenuItem>
                                                                <MenuItem value={2010}>2010</MenuItem>
                                                                <MenuItem value={2011}>2011</MenuItem>
                                                                <MenuItem value={2012}>2012</MenuItem>
                                                                <MenuItem value={2013}>2013</MenuItem>
                                                                <MenuItem value={2014}>2014</MenuItem>
                                                                <MenuItem value={2015}>2015</MenuItem>
                                                                <MenuItem value={2016}>2016</MenuItem>
                                                                <MenuItem value={2017}>2017</MenuItem>
                                                                <MenuItem value={2018}>2018</MenuItem>
                                                                <MenuItem value={2019}>2019</MenuItem>
                                                                <MenuItem value={2020}>2020</MenuItem>

                                                            </Select>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Kms Driven</h6>
                                                    <div>
                                                        <InputLabel id="model">Select Kms Driven</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="Kms Driven"
                                                            id="kms_Driven"
                                                            value={this.state.kms_driven}
                                                            onChange={this.handleChange("kms_driven")}
                                                        >
                                                            <MenuItem value={"0 - 25,000"}>0 - 25,000</MenuItem>
                                                            <MenuItem value={"25,000  - 50,000"}>25,000  - 50,000</MenuItem>
                                                            <MenuItem value={"50,000  - 100,000"}>50,000  - 100,000</MenuItem>
                                                            <MenuItem value={"100,000 - 150,000"}>100,000 - 150,000</MenuItem>
                                                            <MenuItem value={"150,000 - 200,000"}>150,000 - 200,000</MenuItem>
                                                            <MenuItem value={"200,000 - 250,000"}>200,000 - 250,000</MenuItem>
                                                            <MenuItem value={"250,000 - 300,000"}>250,000 - 300,000</MenuItem>
                                                            <MenuItem value={"300,000 - 350,000"}>300,000 - 350,000</MenuItem>
                                                            <MenuItem value={"350,000 - 400,000"}>350,000 - 400,000</MenuItem>
                                                            <MenuItem value={"400,000 - 450,000"}>400,000 - 450,000</MenuItem>
                                                            <MenuItem value={"450,000 - 500,000"}>450,000 - 500,000</MenuItem>
                                                            <MenuItem value={"500,000+"}>500,000+</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Engine Type</h6>
                                                    <div>
                                                        <InputLabel id="model">Select Engine Type</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="Engine Type"
                                                            id="engine_type"
                                                            value={this.state.engine_type}
                                                            onChange={this.handleChange("engine_type")}
                                                        >
                                                            <MenuItem value={"petrol"}>Petrol</MenuItem>
                                                            <MenuItem value={"cng"}>CNG</MenuItem>
                                                            <MenuItem value={"diesel"}>Diesel</MenuItem>
                                                            <MenuItem value={"lpg"}>LPG</MenuItem>
                                                            <MenuItem value={"hybrid"}>Hybrid</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className={"col-md-2"}>
                                                    <h6 className={"mt-3"}>Color</h6>
                                                    <InputLabel className={"mt-2"} id="color">Exterior Color</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        labelId="color"
                                                        id="exterior_color"
                                                        value={this.state.exterior_color}
                                                        onChange={this.handleChange("exterior_color")}
                                                    >
                                                        <MenuItem value={"White"}>white</MenuItem>
                                                        <MenuItem value={"Silver"}>silver</MenuItem>
                                                        <MenuItem value={"Black"}>black</MenuItem>
                                                        <MenuItem value={"Grey"}>grey</MenuItem>
                                                        <MenuItem value={"Blue"}>blue</MenuItem>
                                                        <MenuItem value={"Gold"}>gold</MenuItem>
                                                        <MenuItem value={"Navy"}>navy</MenuItem>
                                                        <MenuItem value={"Bronze"}>bronze</MenuItem>
                                                        <MenuItem value={"Burgundy"}>burgundy</MenuItem>
                                                        <MenuItem value={"Green"}>green</MenuItem>
                                                        <MenuItem value={"Indigo"}>indigo</MenuItem>
                                                        <MenuItem value={"Maroon"}>maroon</MenuItem>
                                                        <MenuItem value={"Pink"}>pink</MenuItem>
                                                        <MenuItem value={"Red"}>red</MenuItem>

                                                    </Select>
                                                </div>
                                            </div>


                                            <div className={"row"}>
                                                <div className={"col-md-3"}>
                                                    <h6 className={"mt-3"}>Transmission</h6>
                                                    <div>
                                                        <InputLabel id="make">Select Transmission</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            value={this.state.transmission}
                                                            onChange={this.handleChange("transmission")}
                                                        >
                                                            <MenuItem value={"automatic"}>Automatic</MenuItem>
                                                            <MenuItem value={"manual"}>Manual</MenuItem>

                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className={"col-md-3"}>
                                                    <h6 className={"mt-3"}>Engine Capacity</h6>
                                                    <div>
                                                        <InputLabel id="make">Select Engine Capacity</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            value={this.state.engine_capacity}
                                                            onChange={this.handleChange("engine_capacity")}
                                                        >
                                                            <MenuItem value={"660"}>660</MenuItem>
                                                            <MenuItem value={"800"}>800</MenuItem>
                                                            <MenuItem value={"850"}>850</MenuItem>
                                                            <MenuItem value={"1000"}>1000</MenuItem>
                                                            <MenuItem value={"1200"}>1200</MenuItem>
                                                            <MenuItem value={"1250"}>1250</MenuItem>
                                                            <MenuItem value={"1300"}>1300</MenuItem>
                                                            <MenuItem value={"1500"}>1500</MenuItem>
                                                            <MenuItem value={"1600"}>1600</MenuItem>
                                                            <MenuItem value={"1700"}>1700</MenuItem>
                                                            <MenuItem value={"1800"}>1800</MenuItem>
                                                            <MenuItem value={"2000"}>2000</MenuItem>
                                                            <MenuItem value={"2200"}>2200</MenuItem>
                                                            <MenuItem value={"2400"}>2400</MenuItem>
                                                            <MenuItem value={"2700"}>2700</MenuItem>
                                                            <MenuItem value={"3000"}>3000</MenuItem>
                                                            <MenuItem value={"3500"}>3500</MenuItem>
                                                            <MenuItem value={"3800"}>3800</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={""}>
                                                <div className={"mt-3"}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.searchFilters}
                                                    >
                                                        Search
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div className={"row mt-3"}>
                                    <div className={"col-md-3"}>

                                        {this.renderOlxPostsHorizontal(olxsearch)}
                                    </div>

                                    <div className={"col-md-3"}>
                                        {this.renderPKWPostsHorizontal(pkwsearch)}
                                    </div>


                                    <div className={"col-md-3"}>
                                        {this.renderPKMPostsHorizontal(pkmsearch)}
                                    </div>

                                    <div className={"col-md-3"}>

                                        {this.renderCarBazaarPostsHorizontal(searchResultcarbazar, saved)}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>


                ): (

                    <div>

                        <div
                            className="alert alert-danger"
                            style={{ display: this.state.error ? "" : "none" }}
                        >
                            {this.state.error}
                        </div>
                        <div className={"homepage-slider"}>

                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className={"d-block w-100"}
                                        src={slider1}
                                        alt="First slide"
                                    />
                                    {/*<Carousel.Caption>
                                <h3>Car Bazaar</h3>
                                <p>The home of cars</p>
                            </Carousel.Caption>*/}
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className={"d-block w-100"}
                                        src={slider2}
                                        alt="Third slide"
                                    />

                                    {/*<Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>*/}
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className={"d-block w-100"}
                                        src={slider3}
                                        alt="Third slide"
                                    />

                                    {/*<Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>*/}
                                </Carousel.Item>
                            </Carousel>


                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col-md-2"}>
                                <div className="card">
                                    <div className={"card-body"}>
                                        <div style={{'text-align': 'center'}}>
                                            <h6 className={"card-title"}>Filters</h6>
                                        </div>

                                        <hr/>

                                        <div className={"row"}>
                                            <div className={"col-md-12"}>

                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="search"
                                                    label="KeyWords"
                                                    type="text"
                                                    id="search"
                                                    onChange={this.handleChange("search")}
                                                />


                                                <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger btn-sm mt-2" onClick={this.clickSubmit}>
                                                    Search
                                                </button>

                                                <hr/>
                                            </div>
                                        </div>

                                        <h6>Price</h6>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
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
                                            <div className={"col-md-6"}>
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
                                        </div>
                                        <h6 className={"mt-3"}>Location</h6>
                                        <div>
                                            <InputLabel id="make">Select City</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="location"
                                                id="location"
                                                value={this.state.location}
                                                onChange={this.handleChange("location")}
                                            >
                                                <MenuItem value="" disabled= {true} selected={true}>Select The City</MenuItem>
                                                <MenuItem value="Islamabad">Islamabad</MenuItem>
                                                <MenuItem value="" disabled= {true}>Punjab Cities</MenuItem>
                                                <MenuItem value="Ahmed Nager Chatha">Ahmed Nager Chatha</MenuItem>
                                                <MenuItem value="Ahmadpur East">Ahmadpur East</MenuItem>
                                                <MenuItem value="Ali Khan Abad">Ali Khan Abad</MenuItem>
                                                <MenuItem value="Alipur">Alipur</MenuItem>
                                                <MenuItem value="Arifwala">Arifwala</MenuItem>
                                                <MenuItem value="Attock">Attock</MenuItem>
                                                <MenuItem value="Bhera">Bhera</MenuItem>
                                                <MenuItem value="Bhalwal">Bhalwal</MenuItem>
                                                <MenuItem value="Bahawalnagar">Bahawalnagar</MenuItem>
                                                <MenuItem value="Bahawalpur">Bahawalpur</MenuItem>
                                                <MenuItem value="Bhakkar">Bhakkar</MenuItem>
                                                <MenuItem value="Burewala">Burewala</MenuItem>
                                                <MenuItem value="Chillianwala">Chillianwala</MenuItem>
                                                <MenuItem value="Chakwal">Chakwal</MenuItem>
                                                <MenuItem value="Chichawatni">Chichawatni</MenuItem>
                                                <MenuItem value="Chiniot">Chiniot</MenuItem>
                                                <MenuItem value="Chishtian">Chishtian</MenuItem>
                                                <MenuItem value="Daska">Daska</MenuItem>
                                                <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                                                <MenuItem value="Dera Ghazi Khan">Dera Ghazi Khan</MenuItem>
                                                <MenuItem value="Dhaular">Dhaular</MenuItem>
                                                <MenuItem value="Dina">Dina</MenuItem>
                                                <MenuItem value="Dinga">Dinga</MenuItem>
                                                <MenuItem value="Dipalpur">Dipalpur</MenuItem>
                                                <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                                                <MenuItem value="Fateh Jhang">Fateh Jang</MenuItem>
                                                <MenuItem value="Ghakhar Mandi">Ghakhar Mandi</MenuItem>
                                                <MenuItem value="Gojra">Gojra</MenuItem>
                                                <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                                                <MenuItem value="Gujrat">Gujrat</MenuItem>
                                                <MenuItem value="Gujar Khan">Gujar Khan</MenuItem>
                                                <MenuItem value="Hafizabad">Hafizabad</MenuItem>
                                                <MenuItem value="Haroonabad">Haroonabad</MenuItem>
                                                <MenuItem value="Hasilpur">Hasilpur</MenuItem>
                                                <MenuItem value="Haveli">Haveli</MenuItem>
                                                <MenuItem value="Lakha">Lakha</MenuItem>
                                                <MenuItem value="Jalalpur">Jalalpur</MenuItem>
                                                <MenuItem value="Jattan">Jattan</MenuItem>
                                                <MenuItem value="Jampur">Jampur</MenuItem>
                                                <MenuItem value="Jaranwala">Jaranwala</MenuItem>
                                                <MenuItem value="Jhang">Jhang</MenuItem>
                                                <MenuItem value="Jhelum">Jhelum</MenuItem>
                                                <MenuItem value="Kalabagh">Kalabagh</MenuItem>
                                                <MenuItem value="Karor Lal Esan">Karor Lal Esan</MenuItem>
                                                <MenuItem value="Kasur">Kasur</MenuItem>
                                                <MenuItem value="Kamalia">Kamalia</MenuItem>
                                                <MenuItem value="Kamoke">Kamoke</MenuItem>
                                                <MenuItem value="Khanewal">Khanewal</MenuItem>
                                                <MenuItem value="Khanpur">Khanpur</MenuItem>
                                                <MenuItem value="Kharian">Kharian</MenuItem>
                                                <MenuItem value="Khushab">Khushab</MenuItem>
                                                <MenuItem value="Kot Adu">Kot Adu</MenuItem>
                                                <MenuItem value="Jauharabad">Jauharabad</MenuItem>
                                                <MenuItem value="Lahore">Lahore</MenuItem>
                                                <MenuItem value="Lalamusa">Lalamusa</MenuItem>
                                                <MenuItem value="Layyah">Layyah</MenuItem>
                                                <MenuItem value="Liaquat Pur">Liaquat Pur</MenuItem>
                                                <MenuItem value="Lodhran">Lodhran</MenuItem>
                                                <MenuItem value="Malakwal">Malakwal</MenuItem>
                                                <MenuItem value="Mamoori">Mamoori</MenuItem>
                                                <MenuItem value="Mailsi">Mailsi</MenuItem>
                                                <MenuItem value="Mandi Bahauddin">Mandi Bahauddin</MenuItem>
                                                <MenuItem value="mian Channu">Mian Channu</MenuItem>
                                                <MenuItem value="Mianwali">Mianwali</MenuItem>
                                                <MenuItem value="Multan">Multan</MenuItem>
                                                <MenuItem value="Murree">Murree</MenuItem>
                                                <MenuItem value="Muridke">Muridke</MenuItem>
                                                <MenuItem value="Mianwali Bangla">Mianwali Bangla</MenuItem>
                                                <MenuItem value="Muzaffargarh">Muzaffargarh</MenuItem>
                                                <MenuItem value="Narowal">Narowal</MenuItem>
                                                <MenuItem value="Okara">Okara</MenuItem>
                                                <MenuItem value="Renala Khurd">Renala Khurd</MenuItem>
                                                <MenuItem value="Pakpattan">Pakpattan</MenuItem>
                                                <MenuItem value="Pattoki">Pattoki</MenuItem>
                                                <MenuItem value="Pir Mahal">Pir Mahal</MenuItem>
                                                <MenuItem value="Qaimpur">Qaimpur</MenuItem>
                                                <MenuItem value="Qila Didar Singh">Qila Didar Singh</MenuItem>
                                                <MenuItem value="Rabwah">Rabwah</MenuItem>
                                                <MenuItem value="Raiwind">Raiwind</MenuItem>
                                                <MenuItem value="Rajanpur">Rajanpur</MenuItem>
                                                <MenuItem value="Rahim Yar Khan">Rahim Yar Khan</MenuItem>
                                                <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                                                <MenuItem value="Sadiqabad">Sadiqabad</MenuItem>
                                                <MenuItem value="Safdarabad">Safdarabad</MenuItem>
                                                <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                                                <MenuItem value="Sangla Hill">Sangla Hill</MenuItem>
                                                <MenuItem value="Sarai Alamgir">Sarai Alamgir</MenuItem>
                                                <MenuItem value="Sargodha">Sargodha</MenuItem>
                                                <MenuItem value="Shakargarh">Shakargarh</MenuItem>
                                                <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                                                <MenuItem value="Sialkot">Sialkot</MenuItem>
                                                <MenuItem value="Sohawa">Sohawa</MenuItem>
                                                <MenuItem value="Soianwala">Soianwala</MenuItem>
                                                <MenuItem value="Siranwali">Siranwali</MenuItem>
                                                <MenuItem value="Talagang">Talagang</MenuItem>
                                                <MenuItem value="Taxila">Taxila</MenuItem>
                                                <MenuItem value="Toba Tek  Singh">Toba Tek Singh</MenuItem>
                                                <MenuItem value="Vehari">Vehari</MenuItem>
                                                <MenuItem value="Wah Cantonment">Wah Cantonment</MenuItem>
                                                <MenuItem value="Wazirabad">Wazirabad</MenuItem>
                                                <MenuItem value="" disabled= {true}>Sindh Cities</MenuItem>
                                                <MenuItem value="Badin">Badin</MenuItem>
                                                <MenuItem value="Bhirkan">Bhirkan</MenuItem>
                                                <MenuItem value="Rajo Khanani">Rajo Khanani</MenuItem>
                                                <MenuItem value="Chak">Chak</MenuItem>
                                                <MenuItem value="Dadu">Dadu</MenuItem>
                                                <MenuItem value="Digri">Digri</MenuItem>
                                                <MenuItem value="Diplo">Diplo</MenuItem>
                                                <MenuItem value="Dokri">Dokri</MenuItem>
                                                <MenuItem value="Ghotki">Ghotki</MenuItem>
                                                <MenuItem value="Haala">Haala</MenuItem>
                                                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                                <MenuItem value="Islamkot">Islamkot</MenuItem>
                                                <MenuItem value="Jacobabad">Jacobabad</MenuItem>
                                                <MenuItem value="Jamshoro">Jamshoro</MenuItem>
                                                <MenuItem value="Jungshahi">Jungshahi</MenuItem>
                                                <MenuItem value="Kandhkot">Kandhkot</MenuItem>
                                                <MenuItem value="Kandiaro">Kandiaro</MenuItem>
                                                <MenuItem value="Karachi">Karachi</MenuItem>
                                                <MenuItem value="Kashmore">Kashmore</MenuItem>
                                                <MenuItem value="Keti Bandar">Keti Bandar</MenuItem>
                                                <MenuItem value="Khairpur">Khairpur</MenuItem>
                                                <MenuItem value="Kotri">Kotri</MenuItem>
                                                <MenuItem value="Larkana">Larkana</MenuItem>
                                                <MenuItem value="Matiari">Matiari</MenuItem>
                                                <MenuItem value="Mehar">Mehar</MenuItem>
                                                <MenuItem value="Mirpur Khas">Mirpur Khas</MenuItem>
                                                <MenuItem value="Mithani">Mithani</MenuItem>
                                                <MenuItem value="Mithi">Mithi</MenuItem>
                                                <MenuItem value="Mehrabpur">Mehrabpur</MenuItem>
                                                <MenuItem value="Moro">Moro</MenuItem>
                                                <MenuItem value="Nagarparkar">Nagarparkar</MenuItem>
                                                <MenuItem value="Naudero">Naudero</MenuItem>
                                                <MenuItem value="Naushahro Feroze">Naushahro Feroze</MenuItem>
                                                <MenuItem value="Naushara">Naushara</MenuItem>
                                                <MenuItem value="Nawabshah">Nawabshah</MenuItem>
                                                <MenuItem value="Nazimabad">Nazimabad</MenuItem>
                                                <MenuItem value="Qambar">Qambar</MenuItem>
                                                <MenuItem value="Qasimabad">Qasimabad</MenuItem>
                                                <MenuItem value="Ranipur">Ranipur</MenuItem>
                                                <MenuItem value="Ratodero">Ratodero</MenuItem>
                                                <MenuItem value="Rohri">Rohri</MenuItem>
                                                <MenuItem value="Sakrand">Sakrand</MenuItem>
                                                <MenuItem value="Sanghar">Sanghar</MenuItem>
                                                <MenuItem value="Shahbandar">Shahbandar</MenuItem>
                                                <MenuItem value="Shahdadkot">Shahdadkot</MenuItem>
                                                <MenuItem value="Shahdadpur">Shahdadpur</MenuItem>
                                                <MenuItem value="Shahpur Chakar">Shahpur Chakar</MenuItem>
                                                <MenuItem value="Shikarpaur">Shikarpaur</MenuItem>
                                                <MenuItem value="Sukkur">Sukkur</MenuItem>
                                                <MenuItem value="Tangwani">Tangwani</MenuItem>
                                                <MenuItem value="Tando Adam Khan">Tando Adam Khan</MenuItem>
                                                <MenuItem value="Tando Allahyar">Tando Allahyar</MenuItem>
                                                <MenuItem value="Tando Muhammad Khan">Tando Muhammad Khan</MenuItem>
                                                <MenuItem value="Thatta">Thatta</MenuItem>
                                                <MenuItem value="Umerkot">Umerkot</MenuItem>
                                                <MenuItem value="Warah">Warah</MenuItem>
                                                <MenuItem value="" disabled= {true}>Khyber Cities</MenuItem>
                                                <MenuItem value="Abbottabad">Abbottabad</MenuItem>
                                                <MenuItem value="Adezai">Adezai</MenuItem>
                                                <MenuItem value="Alpuri">Alpuri</MenuItem>
                                                <MenuItem value="Akora Khattak">Akora Khattak</MenuItem>
                                                <MenuItem value="Ayubia">Ayubia</MenuItem>
                                                <MenuItem value="Banda Daud Shah">Banda Daud Shah</MenuItem>
                                                <MenuItem value="Bannu">Bannu</MenuItem>
                                                <MenuItem value="Batkhela">Batkhela</MenuItem>
                                                <MenuItem value="Battagram">Battagram</MenuItem>
                                                <MenuItem value="Birote">Birote</MenuItem>
                                                <MenuItem value="Chakdara">Chakdara</MenuItem>
                                                <MenuItem value="Charsadda">Charsadda</MenuItem>
                                                <MenuItem value="Chitral">Chitral</MenuItem>
                                                <MenuItem value="Daggar">Daggar</MenuItem>
                                                <MenuItem value="Dargai">Dargai</MenuItem>
                                                <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                                                <MenuItem value="dera Ismail Khan">Dera Ismail Khan</MenuItem>
                                                <MenuItem value="Doaba">Doaba</MenuItem>
                                                <MenuItem value="Dir">Dir</MenuItem>
                                                <MenuItem value="Drosh">Drosh</MenuItem>
                                                <MenuItem value="Hangu">Hangu</MenuItem>
                                                <MenuItem value="Haripur">Haripur</MenuItem>
                                                <MenuItem value="Karak">Karak</MenuItem>
                                                <MenuItem value="Kohat">Kohat</MenuItem>
                                                <MenuItem value="Kulachi">Kulachi</MenuItem>
                                                <MenuItem value="Lakki Marwat">Lakki Marwat</MenuItem>
                                                <MenuItem value="Latamber">Latamber</MenuItem>
                                                <MenuItem value="Madyan">Madyan</MenuItem>
                                                <MenuItem value="Mansehra">Mansehra</MenuItem>
                                                <MenuItem value="Mardan">Mardan</MenuItem>
                                                <MenuItem value="Mastuj">Mastuj</MenuItem>
                                                <MenuItem value="Mingora">Mingora</MenuItem>
                                                <MenuItem value="Nowshera">Nowshera</MenuItem>
                                                <MenuItem value="Paharpur">Paharpur</MenuItem>
                                                <MenuItem value="Pabbi">Pabbi</MenuItem>
                                                <MenuItem value="Peshawar">Peshawar</MenuItem>
                                                <MenuItem value="Saidu Sharif">Saidu Sharif</MenuItem>
                                                <MenuItem value="Shorkot">Shorkot</MenuItem>
                                                <MenuItem value="Shewa Adda">Shewa Adda</MenuItem>
                                                <MenuItem value="Swabi">Swabi</MenuItem>
                                                <MenuItem value="Swat">Swat</MenuItem>
                                                <MenuItem value="Tangi">Tangi</MenuItem>
                                                <MenuItem value="Tank">Tank</MenuItem>
                                                <MenuItem value="Thall">Thall</MenuItem>
                                                <MenuItem value="Timergara">Timergara</MenuItem>
                                                <MenuItem value="Tordher">Tordher</MenuItem>
                                                <MenuItem value="" disabled= {true}>Balochistan Cities</MenuItem>
                                                <MenuItem value="Awaran">Awaran</MenuItem>
                                                <MenuItem value="Barkhan">Barkhan</MenuItem>
                                                <MenuItem value="Chagai">Chagai</MenuItem>
                                                <MenuItem value="Dera Bugti">Dera Bugti</MenuItem>
                                                <MenuItem value="Gwadar">Gwadar</MenuItem>
                                                <MenuItem value="Harnai">Harnai</MenuItem>
                                                <MenuItem value="Jafarabad">Jafarabad</MenuItem>
                                                <MenuItem value="Jhal Magsi">Jhal Magsi</MenuItem>
                                                <MenuItem value="Kacchi">Kacchi</MenuItem>
                                                <MenuItem value="Kalat">Kalat</MenuItem>
                                                <MenuItem value="Kech">Kech</MenuItem>
                                                <MenuItem value="Kharan">Kharan</MenuItem>
                                                <MenuItem value="Khuzdar">Khuzdar</MenuItem>
                                                <MenuItem value="Killa Abdullah">Killa Abdullah</MenuItem>
                                                <MenuItem value="Killa Saifullah">Killa Saifullah</MenuItem>
                                                <MenuItem value="Kohlu">Kohlu</MenuItem>
                                                <MenuItem value="Lasbela">Lasbela</MenuItem>
                                                <MenuItem value="Lehri">Lehri</MenuItem>
                                                <MenuItem value="Loralai">Loralai</MenuItem>
                                                <MenuItem value="Mastung">Mastung</MenuItem>
                                                <MenuItem value="Musakhel">Musakhel</MenuItem>
                                                <MenuItem value="Nasirabad">Nasirabad</MenuItem>
                                                <MenuItem value="Nushki">Nushki</MenuItem>
                                                <MenuItem value="Panjgur">Panjgur</MenuItem>
                                                <MenuItem value="Pishin valley">Pishin Valley</MenuItem>
                                                <MenuItem value="Quetta">Quetta</MenuItem>
                                                <MenuItem value="Sherani">Sherani</MenuItem>
                                                <MenuItem value="Sibi">Sibi</MenuItem>
                                                <MenuItem value="Sohbatpur">Sohbatpur</MenuItem>
                                                <MenuItem value="Washuk">Washuk</MenuItem>
                                                <MenuItem value="Zhob">Zhob</MenuItem>
                                                <MenuItem value="Ziarat">Ziarat</MenuItem>

                                            </Select>
                                        </div>


                                        <h6 className={"mt-3"}>Make</h6>
                                        <div>
                                            <InputLabel id="make">Select Make</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="make"
                                                id="make"
                                                value={this.state.make}
                                                onChange={this.handleMake("make")}
                                            >
                                                {this.state.makefound.map((make)=> <MenuItem value={make._id}>{make._id}</MenuItem>)}
                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Model</h6>
                                        <div>
                                            <InputLabel id="model">Select Model</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="model"
                                                id="model"
                                                onOpen={this.handleMake("model")}
                                                value={this.state.model}
                                                onChange={this.handleChange("model")}
                                            >
                                                {this.state.modelfound.map((model)=> <MenuItem value={model._id}>{model._id}</MenuItem>)}
                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Registration City</h6>
                                        <div>
                                            <InputLabel id="make">Select City</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="reg_city"
                                                id="reg_city"
                                                value={this.state.reg_city}
                                                onChange={this.handleChange("reg_city")}
                                            >
                                                <MenuItem value={"Abbottabad"}>Abbottabad</MenuItem>
                                                <MenuItem value={"Dera Ghazi Khan"}>Dera Ghazi Khan</MenuItem>
                                                <MenuItem value={"Dera Ismail Khan"}>Dera Ismail Khan</MenuItem>
                                                <MenuItem value={"Faisalabad"}>Faisalabad</MenuItem>
                                                <MenuItem value={"Gilgit"}>Gilgit</MenuItem>
                                                <MenuItem value={"Gujranwala"}>Gujranwala</MenuItem>
                                                <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
                                                <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                                                <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                                                <MenuItem value={"Karachi"}>Karachi</MenuItem>
                                                <MenuItem value={"Kohat"}>Kohat</MenuItem>
                                                <MenuItem value={"Lahore"}>Lahore</MenuItem>
                                                <MenuItem value={"Mianwali"}>Mianwali</MenuItem>
                                                <MenuItem value={"Multan"}>Multan</MenuItem>
                                                <MenuItem value={"Murree"}>Murree</MenuItem>
                                                <MenuItem value={"Muzaffarabad"}>Muzaffarabad</MenuItem>
                                                <MenuItem value={"Peshawar"}>Peshawar</MenuItem>
                                                <MenuItem value={"Quetta"}>Quetta</MenuItem>
                                                <MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
                                                <MenuItem value={"Sargodha"}>Sargodha</MenuItem>
                                                <MenuItem value={"Sialkot"}>Sialkot</MenuItem>

                                            </Select>
                                        </div>


                                        <h6 className={"mt-3"}>Year</h6>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <InputLabel id="model">From</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="From"
                                                    id="year_from"
                                                    value={this.state.year_from}
                                                    onChange={this.handleChange("year_from")}
                                                >
                                                    <MenuItem value={1971}>1970</MenuItem>
                                                    <MenuItem value={1972}>1971</MenuItem>
                                                    <MenuItem value={1973}>1972</MenuItem>
                                                    <MenuItem value={1974}>1973</MenuItem>
                                                    <MenuItem value={1975}>1974</MenuItem>
                                                    <MenuItem value={1976}>1975</MenuItem>
                                                    <MenuItem value={1977}>1976</MenuItem>
                                                    <MenuItem value={1978}>1978</MenuItem>
                                                    <MenuItem value={1979}>1979</MenuItem>
                                                    <MenuItem value={1980}>1980</MenuItem>
                                                    <MenuItem value={1981}>1981</MenuItem>
                                                    <MenuItem value={1982}>1982</MenuItem>
                                                    <MenuItem value={1983}>1983</MenuItem>
                                                    <MenuItem value={1984}>1984</MenuItem>
                                                    <MenuItem value={1985}>1985</MenuItem>
                                                    <MenuItem value={1986}>1986</MenuItem>
                                                    <MenuItem value={1987}>1987</MenuItem>
                                                    <MenuItem value={1988}>1988</MenuItem>
                                                    <MenuItem value={1989}>1989</MenuItem>
                                                    <MenuItem value={1990}>1990</MenuItem>
                                                    <MenuItem value={1991}>1991</MenuItem>
                                                    <MenuItem value={1992}>1992</MenuItem>
                                                    <MenuItem value={1993}>1993</MenuItem>
                                                    <MenuItem value={1994}>1994</MenuItem>
                                                    <MenuItem value={1995}>1995</MenuItem>
                                                    <MenuItem value={1996}>1996</MenuItem>
                                                    <MenuItem value={1997}>1997</MenuItem>
                                                    <MenuItem value={1998}>1998</MenuItem>
                                                    <MenuItem value={1999}>1999</MenuItem>
                                                    <MenuItem value={2000}>2000</MenuItem>
                                                    <MenuItem value={2001}>2001</MenuItem>
                                                    <MenuItem value={2002}>2002</MenuItem>
                                                    <MenuItem value={2003}>2003</MenuItem>
                                                    <MenuItem value={2004}>2004</MenuItem>
                                                    <MenuItem value={2005}>2005</MenuItem>
                                                    <MenuItem value={2006}>2006</MenuItem>
                                                    <MenuItem value={2007}>2007</MenuItem>
                                                    <MenuItem value={2008}>2008</MenuItem>
                                                    <MenuItem value={2009}>2009</MenuItem>
                                                    <MenuItem value={2010}>2010</MenuItem>
                                                    <MenuItem value={2011}>2011</MenuItem>
                                                    <MenuItem value={2012}>2012</MenuItem>
                                                    <MenuItem value={2013}>2013</MenuItem>
                                                    <MenuItem value={2014}>2014</MenuItem>
                                                    <MenuItem value={2015}>2015</MenuItem>
                                                    <MenuItem value={2016}>2016</MenuItem>
                                                    <MenuItem value={2017}>2017</MenuItem>
                                                    <MenuItem value={2018}>2018</MenuItem>
                                                    <MenuItem value={2019}>2019</MenuItem>
                                                    <MenuItem value={2020}>2020</MenuItem>

                                                </Select>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <InputLabel id="model">To</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="To"
                                                    id="year_to"
                                                    value={this.state.year_to}
                                                    onChange={this.handleChange("year_to")}
                                                >
                                                    <MenuItem value={1971}>1970</MenuItem>
                                                    <MenuItem value={1972}>1971</MenuItem>
                                                    <MenuItem value={1973}>1972</MenuItem>
                                                    <MenuItem value={1974}>1973</MenuItem>
                                                    <MenuItem value={1975}>1974</MenuItem>
                                                    <MenuItem value={1976}>1975</MenuItem>
                                                    <MenuItem value={1977}>1976</MenuItem>
                                                    <MenuItem value={1978}>1978</MenuItem>
                                                    <MenuItem value={1979}>1979</MenuItem>
                                                    <MenuItem value={1980}>1980</MenuItem>
                                                    <MenuItem value={1981}>1981</MenuItem>
                                                    <MenuItem value={1982}>1982</MenuItem>
                                                    <MenuItem value={1983}>1983</MenuItem>
                                                    <MenuItem value={1984}>1984</MenuItem>
                                                    <MenuItem value={1985}>1985</MenuItem>
                                                    <MenuItem value={1986}>1986</MenuItem>
                                                    <MenuItem value={1987}>1987</MenuItem>
                                                    <MenuItem value={1988}>1988</MenuItem>
                                                    <MenuItem value={1989}>1989</MenuItem>
                                                    <MenuItem value={1990}>1990</MenuItem>
                                                    <MenuItem value={1991}>1991</MenuItem>
                                                    <MenuItem value={1992}>1992</MenuItem>
                                                    <MenuItem value={1993}>1993</MenuItem>
                                                    <MenuItem value={1994}>1994</MenuItem>
                                                    <MenuItem value={1995}>1995</MenuItem>
                                                    <MenuItem value={1996}>1996</MenuItem>
                                                    <MenuItem value={1997}>1997</MenuItem>
                                                    <MenuItem value={1998}>1998</MenuItem>
                                                    <MenuItem value={1999}>1999</MenuItem>
                                                    <MenuItem value={2000}>2000</MenuItem>
                                                    <MenuItem value={2001}>2001</MenuItem>
                                                    <MenuItem value={2002}>2002</MenuItem>
                                                    <MenuItem value={2003}>2003</MenuItem>
                                                    <MenuItem value={2004}>2004</MenuItem>
                                                    <MenuItem value={2005}>2005</MenuItem>
                                                    <MenuItem value={2006}>2006</MenuItem>
                                                    <MenuItem value={2007}>2007</MenuItem>
                                                    <MenuItem value={2008}>2008</MenuItem>
                                                    <MenuItem value={2009}>2009</MenuItem>
                                                    <MenuItem value={2010}>2010</MenuItem>
                                                    <MenuItem value={2011}>2011</MenuItem>
                                                    <MenuItem value={2012}>2012</MenuItem>
                                                    <MenuItem value={2013}>2013</MenuItem>
                                                    <MenuItem value={2014}>2014</MenuItem>
                                                    <MenuItem value={2015}>2015</MenuItem>
                                                    <MenuItem value={2016}>2016</MenuItem>
                                                    <MenuItem value={2017}>2017</MenuItem>
                                                    <MenuItem value={2018}>2018</MenuItem>
                                                    <MenuItem value={2019}>2019</MenuItem>
                                                    <MenuItem value={2020}>2020</MenuItem>

                                                </Select>

                                            </div>

                                        </div>

                                        <h6 className={"mt-3"}>Kms Driven</h6>
                                        <div>
                                            <InputLabel id="model">Select Kms Driven</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="Kms Driven"
                                                id="kms_Driven"
                                                value={this.state.kms_driven}
                                                onChange={this.handleChange("kms_driven")}
                                            >
                                                <MenuItem value={"0 - 25,000"}>0 - 25,000</MenuItem>
                                                <MenuItem value={"25,000  - 50,000"}>25,000  - 50,000</MenuItem>
                                                <MenuItem value={"50,000  - 100,000"}>50,000  - 100,000</MenuItem>
                                                <MenuItem value={"100,000 - 150,000"}>100,000 - 150,000</MenuItem>
                                                <MenuItem value={"150,000 - 200,000"}>150,000 - 200,000</MenuItem>
                                                <MenuItem value={"200,000 - 250,000"}>200,000 - 250,000</MenuItem>
                                                <MenuItem value={"250,000 - 300,000"}>250,000 - 300,000</MenuItem>
                                                <MenuItem value={"300,000 - 350,000"}>300,000 - 350,000</MenuItem>
                                                <MenuItem value={"350,000 - 400,000"}>350,000 - 400,000</MenuItem>
                                                <MenuItem value={"400,000 - 450,000"}>400,000 - 450,000</MenuItem>
                                                <MenuItem value={"450,000 - 500,000"}>450,000 - 500,000</MenuItem>
                                                <MenuItem value={"500,000+"}>500,000+</MenuItem>
                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Engine Type</h6>
                                        <div>
                                            <InputLabel id="model">Select Engine Type</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="Engine Type"
                                                id="engine_type"
                                                value={this.state.engine_type}
                                                onChange={this.handleChange("engine_type")}
                                            >
                                                <MenuItem value={"petrol"}>Petrol</MenuItem>
                                                <MenuItem value={"cng"}>CNG</MenuItem>
                                                <MenuItem value={"diesel"}>Diesel</MenuItem>
                                                <MenuItem value={"lpg"}>LPG</MenuItem>
                                                <MenuItem value={"hybrid"}>Hybrid</MenuItem>
                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Color</h6>
                                        <div>
                                            <InputLabel className={"mt-2"} id="color">Exterior Color</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="color"
                                                id="exterior_color"
                                                value={this.state.exterior_color}
                                                onChange={this.handleChange("exterior_color")}
                                            >
                                                <MenuItem value={"White"}>white</MenuItem>
                                                <MenuItem value={"Silver"}>silver</MenuItem>
                                                <MenuItem value={"Black"}>black</MenuItem>
                                                <MenuItem value={"Grey"}>grey</MenuItem>
                                                <MenuItem value={"Blue"}>blue</MenuItem>
                                                <MenuItem value={"Gold"}>gold</MenuItem>
                                                <MenuItem value={"Navy"}>navy</MenuItem>
                                                <MenuItem value={"Bronze"}>bronze</MenuItem>
                                                <MenuItem value={"Burgundy"}>burgundy</MenuItem>
                                                <MenuItem value={"Green"}>green</MenuItem>
                                                <MenuItem value={"Indigo"}>indigo</MenuItem>
                                                <MenuItem value={"Maroon"}>maroon</MenuItem>
                                                <MenuItem value={"Pink"}>pink</MenuItem>
                                                <MenuItem value={"Red"}>red</MenuItem>

                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Condition</h6>
                                        <div>
                                            <InputLabel className={"mt-2"} id="color">Select Condition</InputLabel>
                                            <Select
                                                fullWidth
                                                value={this.state.condition}
                                                onChange={this.handleChange("condition")}
                                            >
                                                <MenuItem value={"New"}>New</MenuItem>
                                                <MenuItem value={"Used"}>Used</MenuItem>

                                            </Select>
                                        </div>


                                        <h6 className={"mt-3"}>Transmission</h6>
                                        <div>
                                            <InputLabel className={"mt-2"} id="color">Select Transmission</InputLabel>
                                            <Select
                                                fullWidth
                                                value={this.state.transmission}
                                                onChange={this.handleChange("transmission")}
                                            >
                                                <MenuItem value={"automatic"}>Automatic</MenuItem>
                                                <MenuItem value={"manual"}>Manual</MenuItem>

                                            </Select>
                                        </div>

                                        <h6 className={"mt-3"}>Engine Capacity</h6>
                                        <div>
                                            <InputLabel className={"mt-2"} id="color">Select CC</InputLabel>
                                            <Select
                                                fullWidth
                                                value={this.state.engine_capacity}
                                                onChange={this.handleChange("engine_capacity")}
                                            >
                                                <MenuItem value={"660"}>660</MenuItem>
                                                <MenuItem value={"800"}>800</MenuItem>
                                                <MenuItem value={"850"}>850</MenuItem>
                                                <MenuItem value={"1000"}>1000</MenuItem>
                                                <MenuItem value={"1200"}>1200</MenuItem>
                                                <MenuItem value={"1250"}>1250</MenuItem>
                                                <MenuItem value={"1300"}>1300</MenuItem>
                                                <MenuItem value={"1500"}>1500</MenuItem>
                                                <MenuItem value={"1600"}>1600</MenuItem>
                                                <MenuItem value={"1700"}>1700</MenuItem>
                                                <MenuItem value={"1800"}>1800</MenuItem>
                                                <MenuItem value={"2000"}>2000</MenuItem>
                                                <MenuItem value={"2200"}>2200</MenuItem>
                                                <MenuItem value={"2400"}>2400</MenuItem>
                                                <MenuItem value={"2700"}>2700</MenuItem>
                                                <MenuItem value={"3000"}>3000</MenuItem>
                                                <MenuItem value={"3500"}>3500</MenuItem>
                                                <MenuItem value={"3800"}>3800</MenuItem>
                                            </Select>
                                        </div>


                                        <div className={"mt-3"}>
                                            <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger btn-sm mt-2" onClick={this.searchFilters}>
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className={"col-md-10"}>



                                <div className={"clearfix"}></div>
                                {this.renderCarBazaarhome(cbposts, saved)}
                                <div >
                                    <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                                </div>


                                {this.renderCarBazaardealers(cbpostsdealers, saved)}
                                {this.renderOlxPosts(olxhome)}
                                <div >
                                    <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.olxpageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.olxhandlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                                </div>


                                {this.renderPKWhomePosts(pkhome)}
                                <div >
                                    <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.pkwpageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.pkwhandlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                                </div>
                                {this.renderPKMhomePosts(pkmhome)}

                                <div >
                                    <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.pkmpageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.pkmhandlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                                </div>
                            </div>
                        </div>


                    </div>
                )}


            </div>


        );
    }
}

export default Posts;
