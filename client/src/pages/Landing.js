import React, { Component } from "react";
import Login from "../components/Login/index";
import { withRouter } from "react-router";
import Firebase from "../config/Firebase";

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

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user && !Firebase.auth().currentUser.isAnonymous) {
        this.props.history.push("/search");
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <>
        <h1>Landing Page</h1>
        <h1>Content for landing pages</h1>
        <br />
        <Login />
      </>
    );
  }
}

export default withRouter(Landing);
