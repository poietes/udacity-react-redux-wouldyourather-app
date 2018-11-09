import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  logoutHandler = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser());
  };

  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              Create New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
        </ul>

        {this.props.user && (
          <div className="authedUser">
            <div className="authedUser-name">Hello, {this.props.user.name}</div>
            <div
              className="authedUser-avatar"
              style={{ backgroundImage: `url(${this.props.user.avatarURL})` }}
            />
            <button onClick={e => this.logoutHandler(e)}>Log out</button>
          </div>
        )}
      </nav>
    );
  }
}

function mapStatetoProps({ authedUser, users }) {
  const user = authedUser === null ? null : users[authedUser];

  return {
    user
  };
}

export default connect(mapStatetoProps)(Nav);
