import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Firebase from "../../../config/Firebase";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import FormLabel from "@material-ui/core/FormLabel";
import UserSettings from "@material-ui/icons/SettingsApplications";
import RadioUserOptions from "./DietOptions";
import AllergyOptions from "./AllergyOptions";

const styles = theme => ({
  list: {
    width: 250
  },
  button: {
    margin: theme.spacing.unit
  },
  logoutBtn: {
    margin: "15px 8px 8px 0",
    background: "linear-gradient(to right, #2a5298, #1e3c72)"
  },
  input: {
    display: "none"
  }
});

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      isAnonymous: Firebase.auth().currentUser.isAnonymous
    });
  };

  userLogout = () => {
    Firebase.auth()
      .signOut()
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  userSignup = () => {
    Firebase.auth()
      .currentUser.delete()
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
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
        {!this.state.isAnonymous ? (
          <div className={this.props.sidebarSavePlacement}>
            <Button
              variant="contained"
              className={[classes.button, this.props.sidebarSaveButton].join(
                " "
              )}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={[classes.button, classes.logoutBtn].join(" ")}
              onClick={this.userLogout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          false
        )}
        {this.state.isAnonymous ? (
          <>
            <Divider />
            <FormLabel className={this.props.sidebarLoginText}>
              Register Today
            </FormLabel>
          </>
        ) : (
          false
        )}
        <div className={this.props.sidebarLoginButtons}>
          {this.state.isAnonymous ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.userSignup}
              >
                Sign Up
              </Button>
            </>
          ) : (
            false
          )}
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
            label="Settings"
            icon={<UserSettings className={this.props.navcon} />}
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

export default withRouter(withStyles(styles)(TemporaryDrawer));
