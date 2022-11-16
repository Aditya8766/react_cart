import React from "react";
import "./search.css";

function Search(props) {
  console.log("props::",props);
  return (
    <div className="search">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={(event) => props.handleSearch(event)}
      />
    </div>
  );
}
export default Search;
