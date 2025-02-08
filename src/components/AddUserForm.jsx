import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserThunk } from "../store/slices/leaderboardSlice";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const dispatch = useDispatch();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (name.length > 250) {
      newErrors.name = "Name must be 250 characters or less.";
    }

    // Age validation
    if (age < 0) {
      newErrors.age = "Age cannot be negative.";
    }

    // Address validation
    if (address.length > 250) {
      newErrors.address = "Address must be 250 characters or less.";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      if (name && age && address) {
        // Set form data
        const data = { name, age: Number(age), address };
        dispatch(addUserThunk(data));

        // Reset form
        setName("");
        setAge("");
        setAddress("");
        setErrors({}); // Clear errors after successful submission
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-gray-100 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-3">Add New User</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Name Input */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Age Input */}
        <div className="w-1/4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 ${
              errors.age ? "border-red-500" : ""
            }`}
            required
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Address Input */}
        <div className="w-full">
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 ${
              errors.address ? "border-red-500" : ""
            }`}
            rows={3} // Set rows for textarea
            required
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
