import React, { Component } from "react";
import { connect } from "react-redux";
import StaticPoll from "./StaticPoll";

class HomePage extends Component {
  state = {
    tab: "unanswered"
  };

  tabHandler = e => {
    this.setState({ tab: e.target.dataset.tab });
  };

  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div className="hbox">
        <div className="hbox__header">
          <div
            className="hbox__tab"
            onClick={e => this.tabHandler(e)}
            data-tab="unanswered"
            style={
              this.state.tab === "unanswered"
                ? { backgroundColor: "#db4646" }
                : { backgroundColor: "#bbb" }
            }
          >
            Unanswered Questions
          </div>
          <div
            className="hbox__tab"
            onClick={e => this.tabHandler(e)}
            data-tab="answered"
            style={
              this.state.tab === "answered"
                ? { backgroundColor: "#db4646" }
                : { backgroundColor: "#bbb" }
            }
          >
            Answered Questions
          </div>
        </div>
        <div className="hbox__body">
          <div
            className="hbox__list"
            style={
              this.state.tab === "unanswered"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {unansweredQuestions.map(id => (
              <StaticPoll key={id} id={id} />
            ))}
          </div>
          <div
            className="hbox__list"
            style={
              this.state.tab === "answered"
                ? { display: "block" }
                : { display: "none" }
            }
          >
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
