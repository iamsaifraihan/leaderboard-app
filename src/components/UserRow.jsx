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
    if (user.points === 0) return;
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
      className={`hover:bg-violet-100 dark:hover:bg-stone-700 ${
        index % 2 === 0
          ? "bg-violet-50 dark:bg-stone-800"
          : "bg-white dark:bg-stone-900"
      }`}
    >
      <td
        className="p-4 text-lg font-medium cursor-pointer text-violet-800 dark:text-violet-400"
        onClick={onSelect}
      >
        {user.name}
      </td>
      <td className="p-4 text-center font-bold text-gray-700 dark:text-white">
        {user.points}
      </td>
      <td className="p-4 flex justify-end gap-2">
        <button
          onClick={handleIncrement}
          className="cursor-pointer border border-green-500  px-2 py-1 rounded-md hover:bg-green-100 hover:text-white transition"
        >
          ➕
        </button>
        <button
          onClick={handleDecrement}
          className="cursor-pointer border border-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-100 hover:text-white transition"
        >
          ➖
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer border border-red-500 px-2 py-1 rounded-md hover:bg-red-100 hover:text-white transition"
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
