import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import "./style.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    borderRadius: "0 !important",
    color: "white!important",
    border: "solid white 1px",
    fontSize: "18px",
    alignSelf: "center",
    marginTop: "13px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.37)",
    background: "indianred",
    "&:hover": {
      background: "rgb(120, 53, 53)"
    }
  },
  input: {
    display: "none"
  }
});

class NoMatch extends Component {
  returnToHome = props => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="errorBg">
        <div className="errorBgDesign" />
        <div className="contentBox">
          <div className="imageBox">
            <h1 className="errorTextTitle">404</h1>
            <h1 className="errorText">
              Looks like the page you're looking for doesn't exist.
            </h1>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.returnToHome}
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NoMatch));
