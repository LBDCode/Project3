import React, { Component } from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Firebase from "../../config/Firebase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";

import "./style.css";

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 200
  },
  signUp: {
    backgroundColor: "#7ac57b",
    "&:hover": {
      backgroundColor: "rgb(102, 177, 103)"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: { useNextVariants: true }
});

const dietTypes = [
  {
    value: "balanced",
    label: "Balanced"
  },
  {
    value: "low-carb",
    label: "Low Carb"
  },
  {
    value: "low-fat",
    label: "Low Fat"
  },
  {
    value: "high-protein",
    label: "High Protein"
  }
];

class SimpleMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      anchorEl: null,
      openLogIn: false,
      openSignUp: false,
      showPassword: false,
      dietType: "balanced",
      vegan: false,
      vegetarian: false,
      sugar_conscious: false,
      peanut_free: false,
      tree_nut_free: false,
      alcohol_free: false,
      logInError: "We'll never share your email with anyone else.",
      signUpError: "We'll never share your email with anyone else."
    };
  }

  openDropdown = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeDropdown = () => {
    this.setState({ anchorEl: null });
  };

  handleLogin = e => {
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.history.push("/search");
        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        this.setState({ logInError: error.message });
      });
  };

  handleGuest = e => {
    e.preventDefault();
    Firebase.auth()
      .signInAnonymously()
      .then(user => {
        this.props.history.push("/search");
        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        this.setState({ logInError: error.message });
      });
  };

  handleSignUp = e => {
    e.preventDefault();

    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const values = {
          vegan: this.state.vegan,
          vegetarian: this.state.vegetarian,
          sugar_conscious: this.state.sugar_conscious,
          peanut_free: this.state.peanut_free,
          tree_nut_free: this.state.tree_nut_free,
          alcohol_free: this.state.alcohol_free,
          dietType: this.state.dietType,
          email: this.state.email
        };

        // Making sure Sign Up values go through!
        console.log("Sign Up Preferences: ", values);

        API.postUserPreferences(values)
          .then(response =>
            console.log("User Preferences were saved to MongoDB")
          )
          .catch(err => console.log(err));

        // API.postRecipediaValues(values)
        // .then(response => this.setState({ recipes: response.data.hits }))
        // .then(response => console.log(this.state.recipes))
        // .catch(err => console.log(err));

        this.props.history.push("/search");
        // Checks to see if user is anonymously signed in.
        // console.log(Firebase.auth().currentUser.isAnonymous);
      })
      .catch(error => {
        this.setState({ signUpError: error.message });
      });
  };

  credentials = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  openLogInTab = () => {
    this.setState({ openLogIn: true });
  };

  closeLogInTab = () => {
    this.setState({ openLogIn: false });
  };

  openSignUpTab = () => {
    this.setState({ openSignUp: true });
  };

  closeSignUpTab = () => {
    this.setState({ openSignUp: false });
  };

  handleDietType = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleAllergies = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  // handleSearchValues = event => {
  //   event.preventDefault();
  //   const values = {
  //     vegan: this.state.vegan,
  //     vegetarian: this.state.vegetarian,
  //     sugar_conscious: this.state.sugar_conscious,
  //     peanut_free: this.state.peanut_free,
  //     tree_nut_free: this.state.tree_nut_free,
  //     alcohol_free: this.state.alcohol_free,
  //     dietType: this.state.dietType
  //   };

  //   console.log(values);
  // };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.openDropdown}
          className="innerHoverRemoved menuPlacement"
        >
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeDropdown}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={this.openLogInTab}
            className="menuList"
          >
            <MenuItem
              onClick={this.closeDropdown}
              className="innerHoverRemoved"
            >
              Log In
            </MenuItem>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.openSignUpTab}
            className="menuList"
          >
            <MenuItem
              onClick={this.closeDropdown}
              className="innerHoverRemoved"
            >
              Sign Up
            </MenuItem>
          </Button>
        </Menu>
        <Dialog
          open={this.state.openLogIn}
          onClose={this.closeLogInTab}
          aria-labelledby="form-dialog-title"
        >
          <FormControl className="popUpPrompt">
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
              helperText={this.state.logInError}
              variant="outlined"
              id="custom-css-outlined-input"
            />

            <MuiThemeProvider theme={theme}>
              <TextField
                onChange={this.credentials}
                className={this.props.classes.margin}
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                value={this.state.password}
                autoComplete="password"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
              onClick={this.handleGuest}
              variant="contained"
              color="default"
              className={this.props.classes.button}
            >
              Continue As Guest
            </Button>
          </FormControl>
        </Dialog>
        <Dialog
          open={this.state.openSignUp}
          onClose={this.closeSignUpTab}
          aria-labelledby="form-dialog-title"
        >
          <FormControl className="popUpPrompt">
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
              helperText={this.state.signUpError}
              variant="outlined"
              id="custom-css-outlined-input"
            />

            <MuiThemeProvider theme={theme}>
              <TextField
                onChange={this.credentials}
                className={this.props.classes.margin}
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                value={this.state.password}
                autoComplete="password"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </MuiThemeProvider>
            <TextField
              id="filled-select-dietType"
              select
              label="Select"
              className={classes.textField}
              name="dietType"
              value={this.state.dietType}
              onChange={this.handleDietType("dietType")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="What is your favorite diet plan?"
              margin="normal"
              variant="outlined"
            >
              {dietTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormLabel component="legend" className="formLabelText">
              Diet Restrictions?
            </FormLabel>
            <FormGroup className="formatPreferences">
              <Grid container spacing={24}>
                <Grid item sm={6} className="allergyFlexing allergyOptions1">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.vegan}
                        onChange={this.handleAllergies("vegan")}
                        value="vegan"
                      />
                    }
                    label="Vegan"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.vegetarian}
                        onChange={this.handleAllergies("vegetarian")}
                        value="vegetarian"
                      />
                    }
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.sugar_conscious}
                        onChange={this.handleAllergies("sugar_conscious")}
                        value="sugar-conscious"
                      />
                    }
                    label="Sugar-conscious"
                  />
                </Grid>
                <Grid item sm={6} className="allergyFlexing allergyOptions2">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.peanut_free}
                        onChange={this.handleAllergies("peanut_free")}
                        value="peanut-free"
                      />
                    }
                    label="Peanut-free"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.tree_nut_free}
                        onChange={this.handleAllergies("tree_nut_free")}
                        value="tree-nut-free"
                      />
                    }
                    label="Tree Nut-free"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.alcohol_free}
                        onChange={this.handleAllergies("alcohol_free")}
                        value="alcohol-free"
                      />
                    }
                    label="Alcohol-free"
                  />
                </Grid>
              </Grid>
            </FormGroup>
            <FormHelperText className="formHelperText">
              Select all that apply.
            </FormHelperText>
            <Button
              onClick={this.handleSignUp}
              variant="contained"
              color="secondary"
              className={[
                this.props.classes.button,
                this.props.classes.signUp
              ].join(" ")}
            >
              Sign Up
            </Button>
          </FormControl>
        </Dialog>
      </div>
    );
  }
}

SimpleMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SimpleMenu));
