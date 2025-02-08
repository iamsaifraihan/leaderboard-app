import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  incrementPointsThunk,
  decrementPointsThunk,
  deleteUserThunk,
} from "../store/slices/leaderboardSlice";

const UserRow = ({ user }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementPointsThunk(user.id));
  };

  return (
    <tr className="border-b hover:bg-gray-100 transition-all">
      <td className="p-4 text-lg font-medium">{user.name}</td>
      <td className="p-4 text-center font-bold text-gray-700">{user.points}</td>
      <td className="p-4 flex justify-center gap-2">
        <button
          onClick={handleIncrement}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          ➕
        </button>
        <button
          onClick={() => dispatch(decrementPointsThunk(user.id))}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          ➖
        </button>
        <button
          onClick={() => dispatch(deleteUserThunk(user.id))}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          ❌
        </button>
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserRow;
