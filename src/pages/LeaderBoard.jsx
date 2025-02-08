import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "../store/slices/leaderboardSlice";
import UserRow from "../components/UserRow";
import AddUserForm from "../components/AddUserForm";
import SearchSortControls from "../components/SearchSortControls";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchQuery } = useSelector(
    (state) => state.leaderBoard
  );

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const filteredUsers =
    users &&
    users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading)
    return (
      <p className="text-center text-lg font-semibold animate-pulse">
        Loading...
      </p>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🏆 Leaderboard
      </h1>
      <SearchSortControls />
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4">Points</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <AddUserForm />
    </div>
  );
};

export default Leaderboard;
