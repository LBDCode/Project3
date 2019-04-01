import React, { Component } from "react";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RecipeSearchIcon from "@material-ui/icons/ImageSearch";
import DashboardIcon from "@material-ui/icons/TableChart";
import SignUpIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";
import UserOptions from "./Sidebar/UserOptions";
import Firebase from "../../config/Firebase";
import "./style.css";

class ButtonAppBar extends Component {
  state = {
    isAnonymous: false
  };

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onIdTokenChanged(user => {
      this.setState({ isAnonymous: user.isAnonymous });
    });
  }

  render() {
    return (
      <div>
        <AppBar position="static" className="navbarBG">
          <Toolbar className="navFlex">
            <Tabs
              className="navText"
              variant="scrollable"
              // scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Link to={"/search"} className="navText searchTab">
                <Tab
                  label="Recipedia"
                  icon={<RecipeSearchIcon className="navcons" />}
                />
              </Link>
              <Link to={"/dashboard"} className="navText dashboardTab">
                <Tab
                  label="Dashboard"
                  icon={<DashboardIcon className="navcons" />}
                />
              </Link>
              {this.state.isAnonymous ? (
                <Link to={"/"} className="navText dashboardTab">
                  <Tab
                    label="Sign Up"
                    icon={<SignUpIcon className="navcons" />}
                  />
                </Link>
              ) : (
                <UserOptions
                  navtext="navText"
                  navButton="navButton"
                  navcon="navcons"
                  sidebarLoginButtons="sidebarLoginButtons"
                  sidebarLoginText="sidebarLoginText"
                  sidebarSaveButton="sidebarSaveButton"
                  sidebarSavePlacement="sidebarSavePlacement"
                  triggerPrefUpdate={this.props.triggerPrefUpdate}
                />
              )}
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(ButtonAppBar);
