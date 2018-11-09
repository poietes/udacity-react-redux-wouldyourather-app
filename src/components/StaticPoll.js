import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StaticPoll extends Component {
  render() {
    const { id, user, question } = this.props;

    return (
      <div className="poll">
        <div className="poll__col--left">
          <div
            className="poll__avatar"
            style={{ backgroundImage: `url(${user.avatarURL})` }}
          />
        </div>
        <div className="poll__col--right">
          <p className="poll__author">{user.name} asks:</p>
          <h3 className="poll__title">Would you rather</h3>
          <ul className="poll__static-options">
            <li>{question.optionOne.text}</li>
            <li>{question.optionTwo.text}</li>
          </ul>
          <Link to={`/questions/${id}`} className="btn">
            View Poll
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const userID = questions[id].author;
  const user = users[userID];
  const question = questions[id];

  return {
    id,
    user,
    question
  };
}

export default connect(mapStateToProps)(StaticPoll);
