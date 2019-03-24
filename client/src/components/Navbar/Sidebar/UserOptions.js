import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import FormLabel from "@material-ui/core/FormLabel";
import UserAccountIcon from "@material-ui/icons/AccountBox";
import RadioUserOptions from "./DietOptions";
import AllergyOptions from "./AllergyOptions";

const styles = theme => ({
  list: {
    width: 250
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <RadioUserOptions />
        </List>
        <Divider />
        <List>
          <AllergyOptions />
        </List>
        <div className={this.props.sidebarSavePlacement}>
          <Button
            variant="contained"
            className={[classes.button, this.props.sidebarSaveButton].join(" ")}
          >
            Save Changes
          </Button>
        </div>
        <Divider />
        <FormLabel className={this.props.sidebarLoginText}>
          Already a member?
        </FormLabel>
        <div className={this.props.sidebarLoginButtons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Log Out
          </Button>
        </div>
      </div>
    );

    return (
      <div>
        <Button
          className={this.props.navButton}
          onClick={this.toggleDrawer("left", true)}
        >
          {" "}
          <Tab
            className={this.props.navtext}
            label="User Account"
            icon={<UserAccountIcon className={this.props.navcon} />}
          />
        </Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
