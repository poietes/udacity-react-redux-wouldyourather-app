import React, { Component } from "react";

class Score extends Component {
  render() {
    const { name, avatarURL, answered, created, score } = this.props.score;
    return (
      <div className="score">
        <div className="score__col-l">
          <i className="fas fa-trophy" />
          <div
            className="score__avatar"
            style={{ backgroundImage: `url(${avatarURL})` }}
          />
        </div>
        <div className="score__col-m">
          <h3 className="score__name">{name}</h3>
          <div className="score__numbers">
            Answered questions: <span>{answered}</span>
          </div>
          <div className="score__numbers">
            Created questions: <span>{created}</span>
          </div>
        </div>
        <div className="score__col-r">
          <div className="score__box">
            <div className="score__box__header">Score</div>
            <div className="score__box__body">
              <div className="score__box__score">
                <span>{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
