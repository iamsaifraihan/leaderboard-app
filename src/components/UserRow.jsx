import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  incrementPointsThunk,
  decrementPointsThunk,
  deleteUserThunk,
} from "../store/slices/leaderboardSlice";

const UserRow = memo(({ user, index, onSelect }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementPointsThunk(user.id));
  };
  const handleDecrement = () => {
    dispatch(decrementPointsThunk(user.id));
  };
  const handleDelete = () => {
    dispatch(deleteUserThunk(user.id));
  };
  return (
    <motion.tr
      layout // Enable layout animations
      initial={{ opacity: 0, y: -10 }} // Simplified initial state
      animate={{ opacity: 1, y: 0 }} // Simplified animate state
      exit={{ opacity: 0, y: -10 }} // Simplified exit state
      transition={{ duration: 0.2 }} // Faster transition
      whileTap={{ scale: 0.98 }} // Subtle tap effect
      className={`hover:bg-violet-200 ${
        index % 2 === 0 ? "bg-violet-50" : "bg-white"
      }`}
    >
      <td
        className="p-4 text-lg font-medium cursor-pointer text-blue-600 hover:underline"
        onClick={onSelect}
      >
        {user.name}
      </td>
      <td className="p-4 text-center font-bold text-gray-700">{user.points}</td>
      <td className="p-4 flex justify-end gap-2">
        <button
          onClick={handleIncrement}
          className="cursor-pointer border border-green-500  px-3 py-1 rounded-md hover:bg-green-600 hover:text-white transition"
        >
          ➕
        </button>
        <button
          onClick={handleDecrement}
          className="cursor-pointer border border-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 hover:text-white transition"
        >
          ➖
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer border border-red-500 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition"
        >
          ❌
        </button>
      </td>
    </motion.tr>
  );
});

UserRow.displayName = "UserRow";

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default UserRow;
