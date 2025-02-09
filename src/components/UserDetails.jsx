import React, { memo } from "react";
import PropTypes from "prop-types";
import Modal from "./ok";

const UserDetails = memo(({ user, onClose }) => {
  console.log("UserDetails rendered");

  if (!user) return null;

  return (
    <Modal isOpen={!!user} onClose={onClose}>
      <h2 className="text-xl font-semibold">User Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Points:</strong> {user.points}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
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
