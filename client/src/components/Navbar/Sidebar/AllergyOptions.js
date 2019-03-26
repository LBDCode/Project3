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
    dairy_free: true,
    gluten_free: false,
    peanut_free: false,
    shellfish_free: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { dairy_free, gluten_free, peanut_free, shellfish_free } = this.state;

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
                  checked={dairy_free}
                  onChange={this.handleChange("dairy_free")}
                  value="dairy_free"
                />
              }
              label="Dairy-free"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={gluten_free}
                  onChange={this.handleChange("gluten_free")}
                  value="gluten_free"
                />
              }
              label="Gluten-free"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={peanut_free}
                  onChange={this.handleChange("peanut_free")}
                  value="peanut_free"
                />
              }
              label="Peanut-free"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              control={
                <Checkbox
                  checked={shellfish_free}
                  onChange={this.handleChange("shellfish_free")}
                  value="shellfish_free"
                />
              }
              label="Shellfish-free"
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
