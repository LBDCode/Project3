import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Firebase from "./config/Firebase";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Recipe from "./pages/Recipe";
import Recipedia from "./pages/Recipedia";
import Modal from "./pages/Modal";
import PrivateRoute from "./components/PrivateRoute/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Firebase.auth().currentUser
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log("AuthChange", user);

      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute
              exact
              user={user}
              path="/search"
              component={Recipedia}
            />
            <PrivateRoute
              exact
              user={user}
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              exact
              user={user}
              path="/recipe/:id"
              component={Recipe}
            />
            <PrivateRoute exact user={user} path="/modal" component={Modal} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
