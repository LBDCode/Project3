import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RecipeSearchIcon from "@material-ui/icons/ImageSearch";
import DashboardIcon from "@material-ui/icons/TableChart";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions";
import "./style.css";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Sign Up</Button>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            className="navtext"
            variant="scrollable"
            // scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Link to={"/search"} className="navtext">
              {" "}
              <Tab
                label="Search"
                icon={<RecipeSearchIcon className="navcons" />}
              />
            </Link>
            <Link to={"/dashboard"} className="navtext">
              <Tab
                label="Dashboard"
                icon={<DashboardIcon className="navcons" />}
              />
            </Link>
            <UserOptions navtexts="navtext" navcon="navcons" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
