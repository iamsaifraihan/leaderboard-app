import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchUsersThunk } from "../store/slices/leaderboardSlice";
import Loader from "../components/loader";

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
});

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchQuery } = useSelector(
    selectLeaderboardData,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const filteredUsers =
    users &&
    users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) return selectLeaderboardData;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl">
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
              <th className="p-4">Actions</th>
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
              {filteredUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
      <Suspense fallback={<Loader />}>
        <AddUserForm />
      </Suspense>
    </div>
  );
};

export default Leaderboard;
