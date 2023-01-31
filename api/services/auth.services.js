import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import createError from 'http-errors'
import jwt from '../utils/jwt'

const prisma = new PrismaClient()

class AuthService {
  static async register(data) {
    try {
      if (data.password !== data.confirmation_password) {
        throw createError(422, 'Passwords do not match')
      }
  
      data.password = bcrypt.hashSync(data.password, 8)
      delete data.confirmation_password
  
      const user = await prisma.user.create({ data })
  
      console.log('AuthService.register', user)
  
      data.accessToken = await jwt.signAccessToken(user)
      delete data.password
  
      return data
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (err.code === 'P2002') {
          console.dir(err)
          throw createError(422, `User with field [${err.meta.target[0]}] already exists `)
        }
      }
      throw err
    }
  }

  static async login(data) {
    const { email, password } = data
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw createError.NotFound('User not registered')
    }

    const checkPassword = bcrypt.compareSync(password, user, password)
    if (!checkPassword)
      throw createError.Unauthorized('Email address or password not valid')
    delete user.password

    const accessToken = await jwt.signAccessToken(user)
    return { ...user, accessToken }
  }

  static async all() {
    const allUsers = await prisma.user.findMany()
    return allUsers
  }
}

export default AuthService
