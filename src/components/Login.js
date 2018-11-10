import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    user: ""
  };

  changeHandler = e => {
    this.setState({ user: e.target.value });
    document.getElementById("js-error").setAttribute("style", "display: none;");
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.user !== "") {
      this.props.dispatch(setAuthedUser(this.state.user));
    } else {
      document
        .getElementById("js-error")
        .setAttribute("style", "display: block;");
    }
  };

  render() {
    const { userIds, users } = this.props;
    return (
      <div className="loginbox">
        <div className="login">
          <h1 className="login__title">Welcome to the Would You Rather App!</h1>
          <p>Please sign in to continue.</p>
          <form onSubmit={e => this.submitHandler(e)} className="login__form">
            <select
              onChange={e => this.changeHandler(e)}
              value={this.state.user}
            >
              <option value="" key="default" disabled>
                SELECT USER
              </option>
              {userIds.map(id => (
                <option value={id} key={id}>
                  {users[id].name}
                </option>
              ))}
            </select>
            <div className="login__form__footer">
              <div className="login__form__error" id="js-error">
                Please select a user.
              </div>
              <button className="btn btn--signin">SIGN IN</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users);
  return { userIds, users };
}

export default connect(mapStateToProps)(Login);
