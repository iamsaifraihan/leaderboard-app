import { rest } from 'msw'

let users = [
  { id: 1, name: 'Alice', age: 25, points: 2, address: '123 Street, City' },
  { id: 2, name: 'Bob', age: 28, points: 4, address: '456 Avenue, City' },
  { id: 3, name: 'Charlie', age: 22, points: 3, address: '789 Boulevard, City' },
  { id: 4, name: 'David', age: 30, points: 5, address: '101 Road, City' },
  { id: 5, name: 'Eve', age: 27, points: 1, address: '202 Lane, City' },
  { id: 6, name: 'Frank', age: 24, points: 6, address: '303 Drive, City' },
  { id: 7, name: 'Grace', age: 29, points: 7, address: '404 Terrace, City' },
  { id: 8, name: 'Hank', age: 26, points: 0, address: '505 Court, City' },
  { id: 9, name: 'Ivy', age: 23, points: 8, address: '606 Place, City' },
  { id: 10, name: 'Jack', age: 31, points: 9, address: '707 Square, City' }
]

// Shuffle the array
users = users.sort(() => Math.random() - 0.5)

// Select only 7 items
users = users.slice(0, 7)

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(users))
  }),

  rest.post('/api/users', (req, res, ctx) => {
    const newUser = { id: Date.now(), ...req.body, points: 0 }
    users.push(newUser)
    return res(ctx.json(newUser))
  }),

  rest.put('/api/users/:id/increment', (req, res, ctx) => {
    const user = users.find((u) => u.id === Number(req.params.id))
    if (user) user.points += 1
    // users.sort((a, b) => b.points - a.points)
    return res(ctx.json(users))
  }),

  rest.put('/api/users/:id/decrement', (req, res, ctx) => {
    const user = users.find((u) => u.id === Number(req.params.id))
    if (user) user.points -= 1
    // users.sort((a, b) => b.points - a.points)
    return res(ctx.json(users))
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    users = users.filter((u) => u.id !== Number(req.params.id))
    return res(ctx.json(users))
  })
]
