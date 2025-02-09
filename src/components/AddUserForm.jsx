import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addUserThunk } from "../store/slices/leaderboardSlice";
import Modal from "./Modal";

const AddUserForm = ({ isOpen, onClose }) => {
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length > 250)
      newErrors.name = "Name must be 250 characters or less.";
    if (formData.age < 0) newErrors.age = "Age cannot be negative.";
    if (formData.address.length > 250)
      newErrors.address = "Address must be 250 characters or less.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addUserThunk(formData));
      setFormData({
        name: "",
        age: "",
        address: "",
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-3">Add New User</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className={`p-3 border border-violet-600 rounded-sm  w-full focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className={`p-3 border border-violet-600 rounded-sm  w-full focus:ring-2 focus:ring-blue-500 ${
                errors.age ? "border-red-500" : ""
              }`}
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div className="w-full">
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={`p-3 border border-violet-600 rounded-sm w-full focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : ""
              }`}
              rows={3}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-violet-600 px-3 py-2 rounded-md hover:bg-violet-900 text-white transition cursor-pointer"
        >
          Add User
        </button>
      </form>
    </Modal>
  );
};

AddUserForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserForm;
