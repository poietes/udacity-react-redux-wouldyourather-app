import React, { Component } from "react";
import { connect } from "react-redux";
import PollResult from "./PollResult";
import Poll from "./Poll";

class DetailPage extends Component {
  render() {
    const { id, isAnswered } = this.props;

    if (isAnswered) {
      return <PollResult id={id} />;
    } else {
      return <Poll id={id} />;
    }
  }
}

function mapStateToProps({ authedUser, users }, props) {
  const { id } = props.match.params;
  let isAnswered = null;
  if (users[authedUser]) {
    isAnswered =
      Object.keys(users[authedUser].answers).includes(id) === true
        ? true
        : false;
  }
  return {
    id,
    isAnswered
  };
}

export default connect(mapStateToProps)(DetailPage);
