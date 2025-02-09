import React, { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchUsersThunk } from "../store/slices/leaderboardSlice";
import Loader from "../components/loader";
import "../index.css";

const UserRow = lazy(() => import("../components/UserRow"));
const AddUserForm = lazy(() => import("../components/AddUserForm"));
const SearchSortControls = lazy(() =>
  import("../components/SearchSortControls")
);

const selectLeaderboardData = (state) => ({
  users: state.leaderBoard.users,
  loading: state.leaderBoard.loading,
  error: state.leaderBoard.error,
  searchQuery: state.leaderBoard.searchQuery,
  sortBy: state.leaderBoard.sortBy,
});

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchQuery, sortBy } = useSelector(
    selectLeaderboardData,
    shallowEqual
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const filteredUsers =
    users &&
    users
      .filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "points") {
          return b.points - a.points;
        }
        return 0;
      });

  if (loading) return selectLeaderboardData;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-6 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🏆 Leaderboard
      </h1>
      <Suspense fallback={<Loader />}>
        <SearchSortControls />
      </Suspense>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4">Points</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <Suspense
              fallback={
                <tr>
                  <td colSpan="3">
                    <Loader />
                  </td>
                </tr>
              }
            >
              {filteredUsers.map((user, index) => (
                <UserRow key={user.id} user={user} index={index} />
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 border-2 border-violet-600 px-3 py-2 rounded-md hover:bg-violet-600 hover:text-white transition cursor-pointer"
        >
          Add New User
        </button>
        <Suspense fallback={<Loader />}>
          {/* <AddUserForm /> */}
          <AddUserForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Leaderboard;
