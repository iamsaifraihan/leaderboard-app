import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortBy } from "../store/slices/leaderboardSlice";
import PropTypes from "prop-types";

const SearchSortControls = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortBy } = useSelector((state) => state.leaderBoard);

  const handleSearch = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );
  const handleSortByName = useCallback(() => {
    dispatch(setSortBy("name"));
  }, [dispatch]);

  const handleSortByPoints = useCallback(() => {
    dispatch(setSortBy("points"));
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
        className="p-2 rounded-md w-full sm:w-1/2 outline-none border  border-violet-600 dark:border-stone-600 dark:focus:border-violet-600 focus:ring focus:ring-violet-600 "
      />

      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={handleSortByName}
          className={`cursor-pointer  px-4 py-2 rounded-md text-black shadow-md hover:shadow-lg ${
            sortBy === "name" ? "bg-violet-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={handleSortByPoints}
          className={`cursor-pointer px-4 py-2 rounded-md text-black shadow-md hover:shadow-lg ${
            sortBy === "points" ? "bg-violet-600 text-white" : "bg-gray-200"
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
