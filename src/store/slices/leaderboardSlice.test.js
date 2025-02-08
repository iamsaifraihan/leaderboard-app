import { describe, it, expect } from 'vitest'
import leaderboardReducer, { incrementPoints, decrementPoints, addUser, deleteUser } from './leaderboardSlice'

describe('Leaderboard Reducer', () => {
  const initialState = {
    users: [{ id: 1, name: 'Alice', age: 25, points: 0, address: '123 Street' }],
    searchQuery: '',
    sortBy: 'name'
  }

  it('should increment points', () => {
    const state = leaderboardReducer(initialState, incrementPoints(1))
    expect(state.users[0].points).toBe(1)
  })

  it('should decrement points', () => {
    const state = leaderboardReducer(initialState, decrementPoints(1))
    expect(state.users[0].points).toBe(-1)
  })

  it('should add a new user', () => {
    const newUser = { id: 2, name: 'Bob', age: 30, address: '456 Street' }
    const state = leaderboardReducer(initialState, addUser(newUser))
    expect(state.users.length).toBe(2)
  })

  it('should delete a user', () => {
    const state = leaderboardReducer(initialState, deleteUser(1))
    expect(state.users.length).toBe(0)
  })
})
