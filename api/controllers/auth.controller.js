import createError from 'http-errors'
import auth from '../services/auth.services'

class authController {
  static register = async (req, res, next) => {
    try {
      const user = await auth.register(req.body)
      res.status(200).json({
        status: true,
        message: 'User created successfully',
        data: user
      })
    } catch (err) {
      next(createError(err.statusCode, err.message))
    }
  }

  static login = async (req, res, next) => {
    try {
      const data = await auth.login(req.body)
      res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }

  static all = async (req, res, next) => {
    try {
      const users = await auth.all()
      res.status(200).json({
        status: true,
        message: 'All users',
        data: users
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }
}

export default authController
