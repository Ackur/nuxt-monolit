import express from 'express'
import createError from 'http-errors'

import user from './user'
import post from './post'
import auth from './auth'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// user
router.use('/user', user);

// post
router.use('/', post);

// auth
router.use('/auth', auth);

// other
router.use( (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})
router.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

export default router