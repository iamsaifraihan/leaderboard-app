import React, { memo } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const UserDetails = memo(({ user, onClose }) => {
  if (!user) return null;

  return (
    <Modal isOpen={!!user} onClose={onClose}>
      <p className="text-gray-500">User Details</p>
      <hr className="my-2 border border-gray-100" />
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-violet-800 mb-2">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {user.address}
          </p>
        </div>
        <div className="flex justify-end items-end">
          <span className="text-7xl">{user.points}</span>
          <span className="text-sm">points</span>
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
