import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Recipe from "./pages/Recipe";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/recipe/:id" component={Recipe} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
