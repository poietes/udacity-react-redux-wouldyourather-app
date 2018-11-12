import React, { Component } from "react";
import { Link } from "react-router-dom";

class ErrorPage extends Component {
  render() {
    return (
      <div className="errorbox">
        <h1>Page not found</h1>
        <p>
          Whoops! This page no longer exists (or never existed).
          <br />
          Please go to <Link to="/">homepage</Link>.
        </p>
      </div>
    );
  }
}

export default ErrorPage;
