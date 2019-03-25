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
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: "female"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Diet Types</FormLabel>
          <RadioGroup
            aria-label="Diet Types"
            name="dietType"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
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
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
