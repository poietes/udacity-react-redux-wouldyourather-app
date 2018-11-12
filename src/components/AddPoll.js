import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class AddPoll extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { optionOneText, optionTwoText } = this.state;

    if (optionOneText === "" || optionTwoText === "") {
      document
        .getElementById("js-error")
        .setAttribute("style", "display: block;");
    } else {
      dispatch(
        handleSaveQuestion({
          optionOneText,
          optionTwoText
        })
      );

      this.setState({ toHome: true });
    }
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="addpollbox">
        <h1 className="addpoll__title">Create New Poll</h1>
        <div className="addpoll">
          <h3 className="addpoll__subtitle">Would you rather...</h3>
          <form onSubmit={this.submitHandler} className="addpoll__form">
            <input
              type="text"
              name="optionOneText"
              placeholder="Enter Option One Text Here"
              maxLength={160}
              value={optionOneText}
              onChange={this.handleChange}
            />
            <div className="addpoll__divider">OR</div>
            <input
              type="text"
              name="optionTwoText"
              placeholder="Enter Option Two Text Here"
              maxLength={160}
              value={optionTwoText}
              onChange={this.handleChange}
            />
            <div className="addpoll__form__footer">
              <div className="addpoll__form__error" id="js-error">
                Please finish your sentence.
              </div>
              <button className="btn btn--submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddPoll);
