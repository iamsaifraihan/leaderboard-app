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
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Add New User</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border rounded w-1/4"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
