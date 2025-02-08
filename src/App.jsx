import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersThunk } from "./store/slices/leaderboardSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.leaderBoard);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.points} points
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
