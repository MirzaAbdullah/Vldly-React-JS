import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ moviesCount, pageSize, currentPage, onPageChange }) => {
  const totalNoOfPages = Math.ceil(moviesCount / pageSize);
  const pages = _.range(1, totalNoOfPages + 1);

  // if no pagesSize === totalNoOfPages then return null
  if (totalNoOfPages === 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Checking dataTypes of incoming props from parent 'movies'
Pagination.propTypes = {
  moviesCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
