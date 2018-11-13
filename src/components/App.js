import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Leaderboard from "./Leaderboard";
import DetailPage from "./DetailPage";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import AddPoll from "./AddPoll";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    if (authedUser === null) {
      return (
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Redirect
                from="/add"
                to={{
                  pathname: "/login",
                  state: { from: "/add" }
                }}
              />
              <Redirect
                from="/leaderboard"
                to={{
                  pathname: "/login",
                  state: { from: "/leaderboard" }
                }}
              />
              <Redirect
                from="/questions/:id"
                to={{
                  pathname: "/login",
                  state: { from: "/questions/:id" }
                }}
              />
              <Route path="/404" component={ErrorPage} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/add" component={AddPoll} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/questions/:id" component={DetailPage} />
              <Route path="/login" component={Login} />
              <Route path="/404" component={ErrorPage} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
