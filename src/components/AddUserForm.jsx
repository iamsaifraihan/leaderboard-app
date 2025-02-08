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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
