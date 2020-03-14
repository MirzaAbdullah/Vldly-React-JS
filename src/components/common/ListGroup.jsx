import React from "react";

const ListGroup = ({
  items: genres,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(genre)}
          style={{ cursor: "pointer" }}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
