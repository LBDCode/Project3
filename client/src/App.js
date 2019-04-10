import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Firebase from "./config/Firebase";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import TitlePage from "./pages/Title";
import RecipePage from "./pages/RecipePage";
import Recipedia from "./pages/Recipedia";
import Manage from "./pages/ManageMeals";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isAnonymous: false
    };
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillMount() {
    this.authListener();
    this.anonymousCheck();
  }

  anonymousCheck() {
    Firebase.auth().onIdTokenChanged(user => {
      this.setState({ isAnonymous: user.isAnonymous });
    });
  }

  authListener() {
    Firebase.auth().onIdTokenChanged(user => {
      // console.log(user);

      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
        localStorage.setItem("isAnonymous", user.isAnonymous);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("isAnonymous");
      }
    });
  }

  render() {
    return (
      <Router>
        <>
          {this.state.user || localStorage.getItem("user") ? (
            <>
              {this.state.isAnonymous ||
              !localStorage.getItem("isAnonymous") ? (
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/search" component={Recipedia} />
                  <Route exact path="/recipe/:id" component={RecipePage} />
                  <Route exact path="/title" component={TitlePage} />
                  <Route component={NoMatch} />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/search" component={Recipedia} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/recipe/:id" component={RecipePage} />
                  <Route exact path="/title" component={TitlePage} />
                  <Route exact path="/manage" component={Manage} />
                  <Route component={NoMatch} />
                </Switch>
              )}
            </>
          ) : (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={NoMatch} />
            </Switch>
          )}
        </>
      </Router>
    );
  }
}

export default App;
