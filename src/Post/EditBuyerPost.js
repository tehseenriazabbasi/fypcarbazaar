import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import { getMake, getModel} from "./apiPost";
import {b_singlePost, updatebuyer} from "./apiPost";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import {MDBInput} from "mdbreact";

const styles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },

}));



class EditBuyerPost extends Component {
    constructor(){
        super();
        this.state = {
            city: "",
            title : "",
            make: "",
            model: "",
            registration_year: "",
            mileage: "",
            price: "",
            photo: [],
            engine_capacity: "",
            user : {},
            makefound: [],
            modelfound: [],
            error : "",
            fileSize : 0,
            loading : false,
            redirectToProfile: false
        }
    }


    init = (postId) => {

        b_singlePost(postId)
            .then(data => {
                if(data.error){
                    console.log(data.error);
                    this.setState({redirectToProfile: true});
                }
                else{
                    console.log(data);
                    this.setState({id : data._id,
                        title: data.title,
                        city: data.city,
                        model: data.model,
                        make: data.make,
                        registration_year:data.registration_year,
                        mileage: data.mileage,
                        price: data.price,
                        engine_capacity: data.engine_capacity,
                        error: ""});
                }
            });
    };


    handleChange = (name) => event => {
        this.setState({error: ""});
        this.setState({error: ""});

        const value = name === 'photo'? event.target.files : event.target.value;


        if(name === 'photo'){
            let files = event.target.files // create file object
            if (files.length > 3) {
                const msg = 'Only 3 images can be uploaded at a time'
                event.target.value = null // discard selected file
                this.setState({error : msg});
                return false;
            }

            let err = ''
            // list allow mime type
            const types = ['image/png', 'image/jpeg', 'image/gif']
            // loop access array
            for(var x = 0; x<files.length; x++) {
                // compare file type find doesn't matach
                if (types.every(type => files[x].type !== type)) {
                    // create error message and assign to container
                    err += files[x].type+' is not a supported format\n';
                }
            };

            if (err !== '') { // if message not same old that mean has error
                event.target.value = null // discard selected file
                this.setState({error : err});
                return false;
            }
        }


        this.postData.set(name, value);
        this.setState({ [name]:  value});




    };

    handleMake = (name) => event => {
        console.log("make:", name );
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




    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading :true});
        if(this.isvalid()){
            const token = isAuthenticated().token;
            console.log("token1 :", token );
            const postId= this.props.match.params.postId;


            Object.values(this.state.photo).forEach((file, index) => {
                // this.postData.set(`photo[${index}]`, file);
                this.postData.set(`photo-${index}`, file);
            });
            this.postData.set('photos', this.state.photo.length);

            updatebuyer(postId, token, this.postData)
                .then(data=> {
                    if(data.error)
                        this.setState({error: data.error});
                    else {
                        this.setState({redirectToProfile : true});
                    }
                })

        }
    };


    componentDidMount() {
        this.postData = new FormData();
        this.init(this.props.match.params.postId);

        getMake().then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else {
                this.setState({makefound: data});
            }
        })

    }


    isvalid = () =>{
        const {title } = this.state;


        if(title.length === 0 ){
            this.setState({error: "Title is required!", loading :false})
            return false;
        }



        if( this.state.mileage === ""){
            this.setState({error: "Mileage is required", loading :false});
            return false;
        }


        if( this.state.engine_capacity === ""){
            this.setState({error: "Engine Capacity required", loading :false});
            return false;
        }

        if( this.state.city === ""){
            this.setState({error: "City required", loading :false});
            return false;
        }
        return true;

    };


    render() {
        const { classes } = this.props;

        if(this.state.redirectToProfile){
            console.log(" checking : ",isAuthenticated().user._id);
            return <Redirect to={"/user/"+isAuthenticated().user._id}/>
        }

        return (
            <Container component="main" maxWidth="md">
                <CssBaseline />

                <div
                    className="alert alert-danger"
                    style={{ display: this.state.error ? "" : "none" }}
                >
                    {this.state.error}
                </div>

                {this.state.loading? <div className={"jumbotron"}>
                    <h2>Loading..</h2>
                </div>: ""}



                <div className={"row"}>
                    <div className={"col-md-3"}>

                    </div>

                    <div className={"col-md-6 mt-2"}>
                        <Typography  component="h1" variant="h5">
                            Car Information
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange("title")}
                            />


                            <InputLabel className={"mt-2"} id="make">Select Location</InputLabel>
                            <Select
                                fullWidth
                                labelId="Location"
                                id="Location"
                                value={this.state.city}
                                onChange={this.handleMake("city")}
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
                                {this.state.modelfound.map((model)=> <MenuItem value={model.model}>{model.model}</MenuItem>)}
                            </Select>




                            <InputLabel className={"mt-2"} id="model">Year</InputLabel>
                            <Select
                                fullWidth
                                labelId="year"
                                id="year"
                                value={this.state.registration_year}
                                onChange={this.handleChange("registration_year")}
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

                            <InputLabel className={"mt-2"} id="model">KMs Driven</InputLabel>
                            <Select
                                fullWidth
                                labelId="KMs Driven"
                                id="km_driven"
                                value={this.state.mileage}
                                onChange={this.handleChange("mileage")}
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


                            <br/>


                            <Typography component="h1" variant="h5">
                                Price Information
                            </Typography>

                            <InputLabel className={"mt-2"} id="model">Price Range</InputLabel>
                            <Select
                                fullWidth
                                labelId="Price Range"
                                value={this.state.price}
                                onChange={this.handleChange("price")}
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

                            <div className="form-group">
                                <label className="text-muted">Photo</label>
                                <input
                                    required={true}
                                    className="form-control"
                                    type="file"
                                    accept={"image/*"}
                                    onChange={this.handleChange("photo")}
                                />
                            </div>

                            <Typography component="h1" variant="h5">
                                Additional Information
                            </Typography>


                            <label id="color">Engine Capacity (cc)</label>
                            <Select className={"mb-2"}
                                    fullWidth
                                    labelId="engine_capacity"
                                    id="engine_capacity"
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


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.clickSubmit}
                            >
                                POST
                            </Button>
                        </form>
                    </div>
                    <div className="col-md-3">

                    </div>
                </div>
            </Container>
        );
    }
}


EditBuyerPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBuyerPost);


