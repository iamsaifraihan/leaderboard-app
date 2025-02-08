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
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <SearchSortControls />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      <AddUserForm />
    </div>
  );
};

export default Leaderboard;
