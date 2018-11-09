import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";

class Poll extends Component {
  state = {
    selectedOption: "optionOne"
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, question } = this.props;

    dispatch(
      handleSaveQuestionAnswer({
        qid: question.id,
        answer: this.state.selectedOption
      })
    );
  };

  handleChange = e => {
    this.setState({ selectedOption: e.target.value });
  };

  render() {
    const { question, user } = this.props;

    if (question) {
      return (
        <div className="pollbox">
          <h1 className="poll__title">Submit Your Vote!</h1>
          <div className="poll">
            <div className="poll__col--left">
              <div
                className="poll__avatar"
                style={{ backgroundImage: `url(..${user.avatarURL})` }}
              />
            </div>
            <div className="poll__col--right">
              <p className="poll__author">{user.name} asks:</p>
              <h3 className="poll__subtitle">Would You Rather</h3>
              <form onSubmit={this.handleSubmit} className="poll__form">
                <div className="poll__form-block">
                  <input
                    type="radio"
                    name="answer"
                    value="optionOne"
                    id="optionOne"
                    onChange={this.handleChange}
                    checked={this.state.selectedOption === "optionOne"}
                  />
                  <label htmlFor="optionOne">{question.optionOne.text}</label>
                </div>
                <div className="poll__form-block">
                  <input
                    type="radio"
                    name="answer"
                    value="optionTwo"
                    id="optionTwo"
                    onChange={this.handleChange}
                    checked={this.state.selectedOption === "optionTwo"}
                  />
                  <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                </div>
                <div className="poll__form-block">
                  <button type="submit" className="btn btn--submit">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    question: question ? question : null,
    user: question ? users[question.author] : null
  };
}

export default connect(mapStateToProps)(Poll);
