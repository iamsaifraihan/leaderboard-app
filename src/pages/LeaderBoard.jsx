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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Leaderboard
      </h1>
      <SearchSortControls />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Points</th>
              <th className="p-3">Actions</th>
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
