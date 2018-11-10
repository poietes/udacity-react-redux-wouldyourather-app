import React, { Component } from "react";
import { connect } from "react-redux";

class PollResult extends Component {
  getVotes = option => {
    const { question, totalVotes } = this.props;
    const votes = question[option].votes.length;

    return `${votes} out of ${totalVotes} votes`;
  };

  getPct = option => {
    const { question, totalVotes } = this.props;
    const votes = question[option].votes.length;
    const pct = (votes / totalVotes) * 100;

    return pct % 1 !== 0 ? pct.toFixed(2) : pct;
  };

  render() {
    const { question, user, userAnswer } = this.props;

    return (
      <div className="resultbox">
        <h1 className="result__title">Poll Results</h1>
        <div className="result">
          <div className="result__stats">
            <p>Would you rather {question.optionOne.text}?</p>
            <div className="result__bar">
              <div
                className="result__bar__pct"
                style={{ width: `${this.getPct("optionOne")}%` }}
              >
                <span>{this.getPct("optionOne")}%</span>
              </div>
            </div>
            <div className="result__votes">{this.getVotes("optionOne")}</div>
            {userAnswer === "optionOne" && (
              <div className="result__your-vote">
                <i class="fas fa-certificate" />
                <span>YOUR VOTE</span>
              </div>
            )}
          </div>
          <div className="result__stats">
            <p>Would you rather {question.optionTwo.text}?</p>
            <div className="result__bar">
              <div
                className="result__bar__pct"
                style={{ width: `${this.getPct("optionTwo")}%` }}
              >
                <span>{this.getPct("optionTwo")}%</span>
              </div>
            </div>
            <div className="result__votes">{this.getVotes("optionTwo")}</div>
            {userAnswer === "optionTwo" && (
              <div className="result__your-vote">
                <i className="fas fa-certificate" />
                <span>YOUR VOTE</span>
              </div>
            )}
          </div>
          <div
            className="result__avatar"
            style={{ backgroundImage: `url(..${user.avatarURL})` }}
          />
          <div className="result__author">
            <span>Author</span>
            {user.name}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  return {
    user: users[question.author],
    question,
    totalVotes,
    userAnswer: users[authedUser].answers[question.id]
  };
}

export default connect(mapStateToProps)(PollResult);
