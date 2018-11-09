import React, { Component } from "react";
import { connect } from "react-redux";
import Score from "./Score";

class Leaderboard extends Component {
  render() {
    const { scores } = this.props;

    return (
      <div className="leaderboard">
        <h1 className="leaderboard__title">Leaderboard</h1>
        {scores.map(score => (
          <Score key={score.id} score={score} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users);

  let scores = userIds.map(id => {
    const answered = Object.keys(users[id].answers).length;
    const created = users[id].questions.length;

    return {
      id,
      name: users[id].name,
      avatarURL: users[id].avatarURL,
      answered,
      created,
      score: answered + created
    };
  });

  scores = scores.sort((a, b) => b.score - a.score);

  return {
    scores
  };
}

export default connect(mapStateToProps)(Leaderboard);
