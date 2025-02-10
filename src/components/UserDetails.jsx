import React, { memo } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const UserDetails = memo(({ user, onClose }) => {
  if (!user) return null;

  return (
    <Modal isOpen={!!user} onClose={onClose}>
      <p className="text-gray-600 text-sm dark:text-gray-400">User Details</p>
      <div className="flex justify-center items-start my-2">
        <span className="text-7xl">{user.points}</span>
        <span className="text-sm">points</span>
      </div>
      <div className="flex justify-between gap-x-2">
        <div>
          <h2 className="text-xl font-semibold text-violet-800 dark:text-violet-400 mb-2">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      </div>
    </Modal>
  );
});

UserDetails.displayName = "UserDetails";
UserDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default UserDetails;
