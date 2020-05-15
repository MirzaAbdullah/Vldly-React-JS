import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  //UPDATE CASE
  if (movie._id) {
    //To Remove movie._id from passed object
    const body = { ...movie };
    delete body._id;

    return http.put(movieUrl(movie._id), body);
  }

  //ADD NEW RECORD
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
