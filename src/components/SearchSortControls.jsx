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
    <div className="flex flex-wrap justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
        className="p-3 border rounded-md w-full sm:w-1/2 focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => dispatch(setSortBy("name"))}
          className={`px-4 py-2 rounded-md ${
            sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => dispatch(setSortBy("points"))}
          className={`px-4 py-2 rounded-md ${
            sortBy === "points" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Points
        </button>
      </div>
    </div>
  );
};

SearchSortControls.propTypes = {
  searchQuery: PropTypes.string,
  sortBy: PropTypes.oneOf(["name", "points"]),
};

export default SearchSortControls;
