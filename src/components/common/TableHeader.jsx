import React, { Component } from "react";

class TableHeader extends Component {
  onRaiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    //If Column is not Sorted
    if (column.path !== sortColumn.path) return null;

    //If Column is sorted
    if (sortColumn.order === "asc") return <i className="fas fa-sort-up"></i>;

    return <i className="fas fa-sort-down"></i>;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.onRaiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
