import React, { useEffect, Suspense, lazy, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchUsersThunk } from "../store/slices/leaderboardSlice";
import Loader from "../components/loader";
import UserDetails from "../components/UserDetails";
import ThemeToggle from "../ThemeToggle";

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
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleCloseUserDetails = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const rowElm =
    filteredUsers.length === 0 ? (
      <tr>
        <td colSpan="3" className="text-center p-3">
          No users found.
        </td>
      </tr>
    ) : (
      <AnimatePresence>
        {filteredUsers.map((user, index) => (
          <UserRow
            key={user.id}
            user={user}
            index={index}
            onSelect={() => setSelectedUser(user)}
          />
        ))}
      </AnimatePresence>
    );

  if (loading) return selectLeaderboardData;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <ThemeToggle />
      <h1 className="text-3xl font-bold text-center text-violet-800 dark:text-violet-400 mb-6">
        🏆 Leaderboard 🏆
      </h1>
      <Suspense fallback={<Loader />}>
        <SearchSortControls />
      </Suspense>
      <div className="overflow-x-auto rounded-lg shadow-lg dark:shadow-2xl dark:shadow-stone-900">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-violet-700 to-purple-500 text-white">
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
              {rowElm}
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
        {/* <AddUserForm /> */}
        <AddUserForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <UserDetails user={selectedUser} onClose={handleCloseUserDetails} />
    </div>
  );
};

export default Leaderboard;
