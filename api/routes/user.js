import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post(`/`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name
    }
  })
  res.json(result)
})

router.get(`/`, async (req, res) => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(result)
})

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.json(post)
})

export default router
