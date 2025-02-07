import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: 'Alice', age: 25, points: 0, address: '123 Street, City' },
    { id: 2, name: 'Bob', age: 28, points: 0, address: '456 Avenue, City' }
  ],
  searchQuery: '',
  sortBy: 'name' // "name" or "points"
}

const leaderBoardSlice = createSlice({
  name: 'leaderBoardSlice',
  initialState,
  reducers: {
    incrementPoints: (state, action) => {
      const selectedUser = state.find(u => u.id === action.payload);
      if (selectedUser) selectedUser.points += 1
      // Sort the user list 
      state.users.sort((a, b) => a.points - b.points)
    },
    decrementPoints: (state, action) => {
      const selectedUser = state.find(u => u.id === action.payload);
      if (selectedUser) selectedUser.points -= 1
      // Sort the user list 
      state.users.sort((a, b) => a.points - b.points)
    },
    addUser: (state, action) => {
      state.users.push({
        id: Date.now(),
        points: 0,
        ...action.payload,
      })
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload)
    },
    searchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    sortBy: (state, action) => {
      state.sortBy = action.payload
      if (state.sortBy === 'name') {
        state.users.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        state.users.sort((a, b) => a.points - b.points)
      }
    }
  }
})

export const {
  incrementPoints,
  decrementPoints,
  addUser,
  deleteUser,
  searchQuery,
  sortBy
} = leaderBoardSlice.actions

export default leaderBoardSlice.reducer;