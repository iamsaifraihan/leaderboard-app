import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortBy } from "../store/slices/leaderboardSlice";
import PropTypes from "prop-types";

const SearchSortControls = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortBy } = useSelector((state) => state.leaderBoard);

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
      />
      <button
        onClick={() => dispatch(setSortBy("name"))}
        className={sortBy === "name" ? "active" : ""}
      >
        Sort by Name
      </button>
      <button
        onClick={() => dispatch(setSortBy("points"))}
        className={sortBy === "points" ? "active" : ""}
      >
        Sort by Points
      </button>
    </div>
  );
};

SearchSortControls.propTypes = {
  searchQuery: PropTypes.string,
  sortBy: PropTypes.oneOf(["name", "points"]),
};

export default SearchSortControls;
