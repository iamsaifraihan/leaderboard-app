import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserThunk } from "../store/slices/leaderboardSlice";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && address) {
      // set form Data
      const data = { name, age: Number(age), address };
      dispatch(addUserThunk(data));

      // Reset form
      setName("");
      setAge("");
      setAddress("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-gray-100 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-3">Add New User</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-3 border rounded-md w-1/4 focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
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
