import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsersReq,
  addUserReq,
  deleteUserReq,
  incrementUserPointsReq,
  decrementUserPointsReq
} from '../../api/leaderboardApi'

const initialState = {
  loading: false,
  error: null,
  users: [
    { id: 1, name: 'Alice', age: 25, points: 0, address: '123 Street, City' },
    { id: 2, name: 'Bob', age: 28, points: 0, address: '456 Avenue, City' }
  ],
  searchQuery: '',
  sortBy: 'name' // "name" or "points"
}

// Thunks for API calls
export const fetchUsersThunk = createAsyncThunk('leaderboard/fetchUsers', async () => {
  return await fetchUsersReq()
})

export const addUserThunk = createAsyncThunk('leaderboard/addUser', async (user) => {
  return await addUserReq(user)
})

export const deleteUserThunk = createAsyncThunk('leaderboard/deleteUser', async (id) => {
  return await deleteUserReq(id)
})

export const incrementPointsThunk = createAsyncThunk('leaderboard/incrementPoints', async (id) => {
  return await incrementUserPointsReq(id)
})

export const decrementPointsThunk = createAsyncThunk('leaderboard/decrementPoints', async (id) => {
  return await decrementUserPointsReq(id)
})

const leaderBoardSlice = createSlice({
  name: 'leaderBoardSlice',
  initialState,
  reducers: {
    incrementPoints: (state, action) => {
      const selectedUser = state.users.find(u => u.id === action.payload);
      if (selectedUser) selectedUser.points += 1
      // Sort the user list 
      state.users.sort((a, b) => a.points - b.points)
    },
    decrementPoints: (state, action) => {
      const selectedUser = state.users.find(u => u.id === action.payload);
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      if (state.sortBy === 'name') {
        state.users.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        state.users.sort((a, b) => a.points - b.points)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.loading
    })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
      })
      .addCase(incrementPointsThunk.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(decrementPointsThunk.fulfilled, (state, action) => {
        state.users = action.payload
      })
  }
})

export const {
  incrementPoints,
  decrementPoints,
  addUser,
  deleteUser,
  setSearchQuery,
  setSortBy
} = leaderBoardSlice.actions

export default leaderBoardSlice.reducer;