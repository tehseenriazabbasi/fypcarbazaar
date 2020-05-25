import React, { Component } from "react";
import  {signup /*senEmail*/} from "../auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SignupDealer extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            error: "",
            address: "",
            open: false,
            role: "dealer",
            companyname: "",
            companyphone: "",
            companycity: ""
        };
    }

    handleChange = (name) => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };


    isvalid = () =>{
        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "passwords fields doesnot mismatch"})
            return false;
        }
        if(this.state.address == ""){
            this.setState({error: "Company Address is Required"})
            return false;
        }
        if(this.state.companyname == ""){
            this.setState({error: "Company name is Required"})
            return false;
        }
        if(this.state.companyphone == ""){
            this.setState({error: "Company Phone is Required"})
            return false;
        }
        if(!/^((\(((\+|00)92)\)|(\+|00)92)(( |\-)?)(3[0-9]{2})\6|0(3[0-9]{2})( |\-)?)[0-9]{3}( |\-)?[0-9]{4}$/.test(this.state.companyphone)){
            this.setState({error: "invalid Company Phone"});
            return false;
        }
        if(this.state.companycity == ""){
            this.setState({error: "Company City is Required"})
            return false;
        }
        return true;
    }

    clickSubmit = event => {
        event.preventDefault();


        const { name, email, password, phone, address, role, companyname,
            companyphone,
            companycity } = this.state;

        const user = {
            name,
            email,
            password,
            phone,
            address,
            role,
            companyname,
            companyphone,
            companycity
        };
        console.log(user);

        if(this.isvalid()){
            signup(user)
                .then(data=> {
                    if(data.error)
                        this.setState({error: data.error});
                    else {
                        this.setState({
                            error: "",
                            fname : "",
                            lname: "",
                            email: "",
                            phone: "",
                            password: "",
                            confirmPassword : "",
                            address: "",
                            open: true
                        })
                    }
                });
        }




    };

    render() {
        const { error, open } = this.state;
        const { classes } = this.props;



        return (

            <div className={"container"}>
                <CssBaseline />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please sign In.
                    {error}
                </div>
                <div className={"row mt-4 mb-4"}>
                <div className={"col-md-5"}>

                </div>
                <div className={"col-md-2"}>
                    <Avatar style={{'margin-left': '20px'}} className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </div>
                <div className={"col-md-5"}>

                </div>

            </div>


                <div className={"row mt-2"}>

                    <div className={"col-md-6"}>
                        <div style={{'text-align': 'center'}}>
                            <Typography component="h1" variant="h5">
                                Personal Information
                            </Typography>
                        </div>

                        <div className={classes.paper}>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="Name"
                                    name="name"
                                    autoFocus
                                    onChange={this.handleChange("name")}
                                />


                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.handleChange("email")}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                    type={"tel"}
                                    onChange={this.handleChange("phone")}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange("password")}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="Confirm password"
                                    label="ConfirmPassword"
                                    type="password"
                                    id="Confirm password"
                                    autoComplete="confirm-password"
                                    onChange={this.handleChange("confirmPassword")}
                                />


                            </form>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <div style={{'text-align': 'center'}}>
                            <Typography component="h1" variant="h5">
                                Company Information
                            </Typography>
                        </div>

                        <div className={classes.paper}>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="Company Name"
                                    onChange={this.handleChange("companyname")}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Company Phone"
                                    type={"tel"}
                                    onChange={this.handleChange("companyphone")}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Address"
                                    name="address"
                                    type={"text"}
                                    onChange={this.handleChange("address")}
                                />


                                <InputLabel className={"mt-2"}>City</InputLabel>
                                <Select

                                    fullWidth
                                    value={this.state.companycity}
                                    onChange={this.handleChange("companycity")}
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

                            </form>
                        </div>
                    </div>

                </div>

                <div className={"row"}>

                    <div className={"col-md-5"}>

                    </div>

                    <div className={"col-md-2"}>
                        <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger" onClick={this.clickSubmit}>
                            SignUp
                        </button>
                    </div>
                    <div className={"col-md-5"}>

                    </div>
                </div>

            </div>
        );
    }
}

SignupDealer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupDealer);

