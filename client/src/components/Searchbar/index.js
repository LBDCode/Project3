import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import "./style.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(55, 55, 55, 0.45)",
    "&:hover": {
      backgroundColor: "rgba(55, 55, 55, 0.65)"
    },
    marginLeft: "0!important",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    marginTop: "20px"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class SearchAppBar extends Component {
  state = {
    dairy_free: true,
    gluten_free: false,
    peanut_free: false,
    shellfish_free: false
  };

  handleDietTypes = event => {
    this.setState({ value: event.target.value });
  };

  handleAllergies = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { dairy_free, gluten_free, peanut_free, shellfish_free } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="searchMenuBg">
            <Grid container spacing={24}>
              <Grid className="searchbarPlacing" item xs={12}>
                <div className={classes.grow} />
                <Button
                  variant="contained"
                  color="secondary"
                  className="searchBtn"
                >
                  Search
                </Button>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend" className="optionLabels">
                  Diet Types
                </FormLabel>
                <RadioGroup
                  aria-label="Diet Types"
                  name="dietType"
                  className="dietOptions"
                  value={this.state.value}
                  onChange={this.handleDietTypes}
                >
                  <FormControlLabel
                    value="Balanced"
                    control={<Radio />}
                    label="Balanced"
                  />
                  <FormControlLabel
                    value="High-Fiber"
                    control={<Radio />}
                    label="High-Fiber"
                  />
                  <FormControlLabel
                    value="High-Protein"
                    control={<Radio />}
                    label="High-Protein"
                  />
                  <FormControlLabel
                    value="Low-Carb"
                    control={<Radio />}
                    label="Low-Carb"
                  />
                  <FormControlLabel
                    value="Low-Fat"
                    control={<Radio />}
                    label="Low-Fat"
                  />
                  <FormControlLabel
                    value="Low-Sodium	"
                    control={<Radio />}
                    label="Low-Sodium	"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend" className="optionLabels">
                  Food Allergies
                </FormLabel>
                <FormGroup className="allergyOptions">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dairy_free}
                        onChange={this.handleAllergies("dairy_free")}
                        value="dairy_free"
                      />
                    }
                    label="Dairy-free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gluten_free}
                        onChange={this.handleAllergies("gluten_free")}
                        value="gluten_free"
                      />
                    }
                    label="Gluten-free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={peanut_free}
                        onChange={this.handleAllergies("peanut_free")}
                        value="peanut_free"
                      />
                    }
                    label="Peanut-free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={shellfish_free}
                        onChange={this.handleAllergies("shellfish_free")}
                        value="shellfish_free"
                      />
                    }
                    label="Shellfish-free"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchAppBar);
