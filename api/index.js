import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/

export default {
  path: '/api',
  handler: app,
}

app.use('/', routes);
