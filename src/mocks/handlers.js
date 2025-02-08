import { rest } from 'msw'

let users = [
  { id: 1, name: 'Alice', age: 25, points: 0, address: '123 Street, City' },
  { id: 2, name: 'Bob', age: 28, points: 0, address: '456 Avenue, City' }
]

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
    users.sort((a, b) => b.points - a.points)
    return res(ctx.json(users))
  }),

  rest.put('/api/users/:id/decrement', (req, res, ctx) => {
    const user = users.find((u) => u.id === Number(req.params.id))
    if (user) user.points -= 1
    users.sort((a, b) => b.points - a.points)
    return res(ctx.json(users))
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    users = users.filter((u) => u.id !== Number(req.params.id))
    return res(ctx.json(users))
  })
]
