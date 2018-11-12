import React, { Component } from "react";
import { connect } from "react-redux";
import PollResult from "./PollResult";
import Poll from "./Poll";
import { Redirect } from "react-router-dom";

class DetailPage extends Component {
  render() {
    const { id, isAnswered, isValidID } = this.props;

    if (isValidID === false) {
      return <Redirect to="/404" />;
    }

    if (isAnswered) {
      return <PollResult id={id} />;
    } else {
      return <Poll id={id} />;
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const isValidID = questions[id] ? true : false;
  const isAnswered =
    Object.keys(users[authedUser].answers).includes(id) === true ? true : false;

  return {
    id,
    isAnswered,
    isValidID
  };
}

export default connect(mapStateToProps)(DetailPage);
