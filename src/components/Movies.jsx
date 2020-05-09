import React, { Component } from "react";
import Pagination from "./common/Pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesGrid from "./MoviesGrid";
import SearchBox from "./common/SearchBox";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: allGenres } = await getGenres();
    //adding new item at the start of the genre list
    const genres = [{ _id: "", name: "All Genre" }, ...allGenres];

    const { data: allMovies } = await getMovies();
    this.setState({ movies: allMovies, genres });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn,
    } = this.state;

    //Filter movies lists according to selectedGenre
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : allMovies;

    //Filter movies lists according to selectedGenre or SearchBox
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    //Sort the Column according to the sortColumn
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //Paginate movies list according to pageSize
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalFilteredLength: filtered.length, data: movies };
  };

  render() {
    //object destructuring
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      genres: allGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    const { length: moviesCount } = allMovies;
    const { totalFilteredLength, data: movies } = this.getPagedData();
    const { user } = this.props;

    if (moviesCount === 0) {
      return <p className="mt-2">There are no movies in the database</p>;
    }

    return (
      <React.Fragment>
        <h1>Movies</h1>
        <div className="row">
          <div className="col-2 mt-3">
            <ListGroup
              items={allGenre}
              selectedItem={selectedGenre}
              onItemSelect={this.handleSelectedGenre}
            />
          </div>
          <div className="col-10 mt-3">
            {user && (
              <div className="col-12 mb-2">
                <Link to="/movies/new" className="btn btn-primary">
                  New Movie
                </Link>
              </div>
            )}
            <span className="ml-3">
              Showing {totalFilteredLength} movies in the database
            </span>
            <div className="col-12 mb-2 mt-2">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              ></SearchBox>
            </div>
            <div className="col-12 mt-2 table-responsive">
              <MoviesGrid
                movies={movies}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
              />
            </div>
            <div className="col-12">
              <Pagination
                moviesCount={totalFilteredLength}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSelectedGenre = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    //Updating Movies Array
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);

      toast.success("Movie deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie that already been deleted.");

        this.setState({ movies: originalMovies });
      }
    }
  };
}

export default Movies;
