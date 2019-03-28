import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import blue from "@material-ui/core/colors/blue";
import FormControl from "@material-ui/core/FormControl";
import Firebase from "../../config/Firebase";
import Swal from "sweetalert2";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    "&$cssFocused": {
      color: blue[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: blue[500]
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: blue[500]
    }
  },
  notchedOutline: {},
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: { useNextVariants: true }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleLogin = e => {
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log("Logging in", this.props);

        this.props.history.push("/search");

        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.message
        });
      });
  };

  handleGuest = e => {
    e.preventDefault();
    Firebase.auth()
      .signInAnonymously()
      .then(user => {
        this.props.history.push("/search");

        console.log("Logging in anon");
        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.message
        });
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.history.push("/search");
        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.message
        });
      });
  };

  credentials = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Desperate attempt to show "/search" to continuously
  // logged in users who revisit Recipedia.
  //
  //   componentWillUpdate() {
  //     if (localStorage.getItem("user") !== null) {
  //       console.log(
  //         "You are logged in. I am redirecting you to /search. Local Storage Data: " +
  //           localStorage.getItem("user")
  //       );
  //       this.props.history.push("/search");
  //     } else {
  //       console.log(
  //         "You are not logged in anymore. I am redirecting you to /. Local Storage Data: " +
  //           localStorage.getItem("user")
  //       );
  //       this.props.history.push("/");
  //     }
  //   }

  render() {
    return (
      <div className={this.props.classes.root}>
        <FormControl>
          <TextField
            onChange={this.credentials}
            className={this.props.classes.margin}
            InputLabelProps={{
              classes: {
                root: this.props.classes.cssLabel,
                focused: this.props.classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: this.props.classes.cssOutlinedInput,
                focused: this.props.classes.cssFocused,
                notchedOutline: this.props.classes.notchedOutline
              }
            }}
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            autoComplete="email"
            helperText="We'll never share your email with anyone else."
            variant="outlined"
            id="custom-css-outlined-input"
          />

          <MuiThemeProvider theme={theme}>
            <TextField
              onChange={this.credentials}
              className={this.props.classes.margin}
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              autoComplete="password"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
            />
          </MuiThemeProvider>
          <Button
            onClick={this.handleLogin}
            variant="contained"
            color="primary"
            className={this.props.classes.button}
          >
            Log In
          </Button>
          <Button
            onClick={this.handleSignUp}
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
          >
            Sign Up
          </Button>
          <Button
            onClick={this.handleGuest}
            variant="contained"
            color="default"
            className={this.props.classes.button}
          >
            Continue As Guest
          </Button>
        </FormControl>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Login));
