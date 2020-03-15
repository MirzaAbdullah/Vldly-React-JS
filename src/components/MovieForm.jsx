import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1>Movie Form {match.params.id}</h1> <br />
        <button
          className="btn btn-primary btn-sm"
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MovieForm;
