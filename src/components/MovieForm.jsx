import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    //get all Genre
    const genres = getGenres();
    this.setState({ genres });

    //If movieId is 'new' return - it's considered as new form to add
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    //If movieId is !== 'new' return - it's considered as to edit
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    //Call to Server
    saveMovie(this.state.data);

    // redirects to movies page
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

// const MovieForm = ({ match, history }) => {
//   return (
//     <div className="row">
//       <div className="col-12">
//         <h1>Movie Form {match.params.id}</h1> <br />
//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => history.push("/movies")}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MovieForm;
