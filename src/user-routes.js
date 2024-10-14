const Router = require('../framework/Router')
const router = new Router();
const users = [
  {
    id: 1, name: 'Ubabuba',
    id: 2, name: 'Gababa'
  }
]

router.get('/users', (req, res) => {
  console.log(users[0])
  console.log(req.params)
  res.send(users[0])
})

router.post('/posts', (req, res) => {
  const user = req.body;
  console.log(user)
  res.send(user)
})

module.exports = router