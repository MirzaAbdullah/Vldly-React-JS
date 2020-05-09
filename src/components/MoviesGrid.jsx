import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import Like from "./common/Like";
import authService from "../services/authService";

class MoviesGrid extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        if (authService.getCurrentUser()) {
          return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
        }

        return movie.title;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} isLiked={movie.liked} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesGrid;
