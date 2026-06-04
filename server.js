import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'

// 在 ESM 模組中，必須這樣動態模擬出 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const port = process.env.PORT || 3000

server.use(middlewares)
server.use(router)

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
