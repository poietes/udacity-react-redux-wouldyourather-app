import React, { Component } from "react";
import { connect } from "react-redux";
import StaticPoll from "./StaticPoll";

class HomePage extends Component {
  tabHandler = () => {
    console.log("click");
  };

  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div className="hbox">
        <div className="hbox__header">
          <div
            className="hbox__tab hbox__tab--selected"
            onClick={this.tabHandler}
          >
            Unanswered Questions
          </div>
          <div className="hbox__tab" onClick={this.tabHandler}>
            Answered Questions
          </div>
        </div>
        <div className="hbox__body">
          <div className="hbox__list hbox__list--unanswered">
            {unansweredQuestions.map(id => (
              <StaticPoll key={id} id={id} />
            ))}
          </div>
          <div className="hbox__list hbox__list--answered">
            {answeredQuestions.map(id => (
              <StaticPoll key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  let unansweredQuestions = [];
  let answeredQuestions = [];

  questionIds.forEach(id => {
    const isAnswered =
      questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser);

    isAnswered === true
      ? answeredQuestions.push(id)
      : unansweredQuestions.push(id);
  });

  return {
    unansweredQuestions,
    answeredQuestions
  };
}

export default connect(mapStateToProps)(HomePage);
