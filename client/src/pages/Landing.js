import React, { Component } from "react";
import { withRouter } from "react-router";
import Grid from "../components/Landing/index";
import Modal from "../components/Modal-Login/index";

class Landing extends Component {
  // componentDidMount() {
  //   if (localStorage.getItem("user") !== null) {
  //     console.log(
  //       "You are logged in. I am redirecting you to /search. Local Storage Data: " +
  //         localStorage.getItem("user")
  //     );
  //     this.props.history.push("/search");
  //   } else {
  //     console.log(
  //       "You are not logged in anymore. I am redirecting you to /. Local Storage Data: " +
  //         localStorage.getItem("user")
  //     );
  //     this.props.history.push("/");
  //   }
  // }

  render() {
    return (
      <>
        <Grid />
        <Modal />
      </>
    );
  }
}

export default withRouter(Landing);
