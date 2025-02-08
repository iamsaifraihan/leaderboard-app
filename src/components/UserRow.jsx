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
    <tr>
      <td>{user.name}</td>
      <td>{user.points}</td>
      <td>
        <button onClick={handleIncrement}>➕</button>
        <button onClick={() => dispatch(decrementPointsThunk(user.id))}>
          ➖
        </button>
        <button onClick={() => dispatch(deleteUserThunk(user.id))}>❌</button>
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
