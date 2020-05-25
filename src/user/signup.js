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

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      error: "",
      open: false
    };
  }

  handleChange = (name) => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();


    const { name, email, password, phone } = this.state;

    const user = {
      name,
      email,
      password,
      phone
    };
    console.log(user);
    if(this.state.password !== this.state.confirmPassword){
      this.setState({error: "passwords fields doesnot mismatch"})
    }
    else {
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
                open: true
              })
            }
          });
    };

    /*    senEmail(user).then(data =>{
    if(data.error){
      console.log("Error");
    }
    else {
      console.log("Sent");
    }
  })*/

};

  render() {
    const { error, open } = this.state;
    const { classes } = this.props;



    return (

        <Container component="main" maxWidth="xs">
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

          <div className={classes.paper}>
            <div className={"row mt-4 mb-4"}>
              <div className={"col-md-5"}>

              </div>
              <div className={"col-md-2"}>
                <Avatar style={{'margin-left': '20px'}} className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography  className={"ml-2"} component="h1" variant="h5">
                  Signup
                </Typography>
              </div>
              <div className={"col-md-5"}>

              </div>

            </div>
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
                  autoFocus
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


                <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger" onClick={this.clickSubmit}>
                  Signup
                </button>

            </form>
          </div>
        </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);



/*
import React, { Component } from "react";
import  {signup, senEmail} from "../auth";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      error: "",
      open: false
    };
  }

  handleChange = (name) => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();


    const { fname, lname, email, password, phone } = this.state;
    const name = this.state.fname+ " "+ this.state.lname;
    const user = {
      name,
      email,
      password,
      phone
    };
    console.log(user);
    if(this.state.password != this.state.confirmPassword){
      this.setState({error: "passwords fields doesnot mismatch"})
    }
    else {
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
                open: true
              })
            }
          });
    };

/!*    senEmail(user).then(data =>{
      if(data.error){
        console.log("Error");
      }
      else {
        console.log("Sent");
      }
    })*!/

    };


  render() {
    const { fname, lname,email, password, confirmPassword, phone, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup here</h2>

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

        <form>
          <div className="form-group">
            <label className="text-muted">First Name</label>
            <input
              value={fname}
              className="form-control"
              type="text"
              onChange={this.handleChange("fname")}
            />
          </div>


          <div className="form-group">
            <label className="text-muted">Last Name</label>
            <input
                value={lname}
                className="form-control"
                type="text"
                onChange={this.handleChange("lname")}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              value={email}
              className="form-control"
              type="email"
              onChange={this.handleChange("email")}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Phone</label>
            <input
                value={phone}
                className="form-control"
                type="tel"
                required={true}
                onChange={this.handleChange("phone")}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password </label>
            <input
              value={password}
              className="form-control"
              type="password"
              onChange={this.handleChange("password")}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Confirm Password </label>
            <input
                value={confirmPassword}
                className="form-control"
                type="password"
                onChange={this.handleChange("confirmPassword")}
            />
          </div>



          <div className="form-group">
            <button
              onClick={this.clickSubmit}
              className="btn btn-raised btn-primary"
            >
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Signup;
*/
