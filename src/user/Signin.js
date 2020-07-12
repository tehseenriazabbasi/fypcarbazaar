import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom";
import {signin, authenticate} from "../auth";
import SocialLogin from "./SocialLogin";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CometChat } from "@cometchat-pro/chat"


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

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleChange = (name) => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({loading: true});
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    signin(user).then(data => {
      if(data.error)
        this.setState({error: data.error, loading: false});
      else{
        authenticate(data, ()=>{
          this.setState({redirectToReferer: true});
        })
        var res = this.state.email.split("@");

        var UID = res[0].toLowerCase();
        var apiKey = "e78bf71646f74965d49d824d12bf603cbb528eb9";

        CometChat.login(UID, apiKey).then(
            user => {
              console.log("Login Successful:", { user });
            },
            error => {
              console.log("Login failed with exception:", { error });
            }
        );
      }
    })
  };
  render() {
    const { error, redirectToReferer } = this.state;
    const { classes } = this.props;

    if(redirectToReferer){
      return <Redirect to={"/"} />
    }

    return (

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          <div className={classes.paper}>

            <div className={"row mt-4 mb-4"}>
              <div className={"col-md-4"}>

              </div>
              <div className={"col-md-2"}>
                <Avatar style={{'margin-left': '20px'}} className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography  className={"ml-2"} component="h1" variant="h5">
                  Signin
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange("password")}
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
              <button style={{width:'100%', 'margin-top': '4px' , 'margin-bottom':'4px' }} className="btn btn-raised btn-danger" onClick={this.clickSubmit}>
                Signin
              </button>

              <Grid container className={"mt-2"}>
                <Grid item xs>
                  <Link style={{'color': 'deepskyblue'}} href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{'color': 'deepskyblue'}} href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <div className={"mt-2"}>
              <SocialLogin />
            </div>

          </div>
        </Container>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);