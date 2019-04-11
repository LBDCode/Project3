import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
// import Grid from "@material-ui/core/Grid";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormGroup from "@material-ui/core/FormGroup";
import Typography from '@material-ui/core/Typography';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormLabel from "@material-ui/core/FormLabel";
// import Button from "@material-ui/core/Button";
// import API from "../../utils/API";
// import RecipeCard from "../RecipeCard/index";
// import Firebase from "../../config/Firebase";
// import Swal from "sweetalert2";
// import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: "rgba(55, 55, 55, 0.65)",
//     "&:hover": {
//       backgroundColor: "rgba(55, 55, 55, 0.8)"
//     },
//     marginLeft: "0!important",
//     width: "100%",
//     height: "35px",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing.unit,
//       width: "auto"
//     }
//   },
//   searchIcon: {
//     width: theme.spacing.unit * 9,
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   inputRoot: {
//     color: "inherit",
//     width: "100%",
//     position: "relative"
//   },
//   inputInput: {
//     paddingTop: "1px",
//     paddingRight: theme.spacing.unit,
//     paddingBottom: "1px",
//     paddingLeft: theme.spacing.unit * 10,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     height: "30px",
//     [theme.breakpoints.up("sm")]: {
//       width: 120,
//       "&:focus": {
//         width: 200
//       }
//     }
//   },
//   recipeModalTitle: {
//     fontSize: "12px"
//   },
//   recipeModalText: {
//     fontSize: "10px"
//   },
//   buttonProgress: {
//     color: "white",
//     position: "absolute",
//     top: "50%",
//     right: "10%",
//     marginTop: -12,
//     marginLeft: -12
//   },
//   buttonProgressAlt: {
//     color: "rgb(100,100,100)",
//     position: "absolute",
//     top: "50%",
//     right: "-25%",
//     marginTop: -12,
//     marginLeft: -12
//   }
});

class Title extends Component {


  render(props) {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="searchMenuBg">
                <Typography
                  className="title searchbarMarginFix"
                >
                  {this.props.children}
                </Typography>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

Title.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Title);

