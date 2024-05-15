import React from "react";

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className="col">
      <input 
        className="form-control" 
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchBar;
