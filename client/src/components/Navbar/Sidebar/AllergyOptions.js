import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    display: "flex"
  },
  labelSpacing: {
    "letter-spacing": "2px"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class CheckboxesGroup extends React.Component {
  state = {
    vegan: false,
    vegetarian: false,
    sugar_conscious: false,
    peanut_free: false,
    tree_nut_free: false,
    alcohol_free: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const {
      vegan,
      vegetarian,
      sugar_conscious,
      peanut_free,
      tree_nut_free,
      alcohol_free
    } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.labelSpacing}>
            Food Allergies
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={vegan}
                  onChange={this.handleChange("vegan")}
                />
              }
              label="Vegan"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={vegetarian}
                  onChange={this.handleChange("vegetarian")}
                />
              }
              label="Vegetarian"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={sugar_conscious}
                  onChange={this.handleChange("sugar_conscious")}
                />
              }
              label="Sugar-conscious"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={peanut_free}
                  onChange={this.handleChange("peanut_free")}
                />
              }
              label="Peanut-free"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={tree_nut_free}
                  onChange={this.handleChange("tree_nut_free")}
                />
              }
              label="Tree Nut-free"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={alcohol_free}
                  onChange={this.handleChange("alcohol_free")}
                />
              }
              label="Alcohol-free"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxesGroup);
