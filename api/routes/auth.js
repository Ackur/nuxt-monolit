import express from 'express'
import auth from '../middlewares/auth'
import user from '../controllers/auth.controller'

const router = express.Router()
// register
router.post('/register', user.register)
// login
router.post('/login', user.login)
// all users
router.get('/users', auth, user.all)

export default router
