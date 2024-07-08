import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {DbConnect} from './db'
import styles from "./routes/styles";


const app = new Hono()
await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

// 3000/api/styles

app.route('/api', styles)

app.all("*", (c) => {
  return c.json({msg: '404 oups'})
});

serve({
  fetch: app.fetch,
  port
})
