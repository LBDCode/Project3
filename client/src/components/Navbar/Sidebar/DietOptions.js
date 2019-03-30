import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  root: {
    display: "flex"
  },
  labelSpacing: {
    "letter-spacing": "2px"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classes.labelSpacing} component="legend">
            Diet Types
          </FormLabel>
          <RadioGroup
            aria-label="Diet Types"
            name="dietType"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              className={classes.labelSpacing}
              value="balanced"
              control={<Radio />}
              label="Balanced"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              value="high-protein"
              control={<Radio />}
              label="High-Protein"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              value="low-carb"
              control={<Radio />}
              label="Low-Carb"
            />
            <FormControlLabel
              className={classes.labelSpacing}
              value="low-fat"
              control={<Radio />}
              label="Low-Fat"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
