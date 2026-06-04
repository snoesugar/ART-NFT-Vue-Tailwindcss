import { create, router as _router, defaults } from 'json-server'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = create()
const router = _router(join(__dirname, 'db.json'))
const middlewares = defaults()

const port = process.env.PORT || 3000

server.use(middlewares)
server.use(router)

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
