import { SafaDevServer } from 'safa-router'
import { exec } from 'child_process'

const PORT = 5050

const server = new SafaDevServer({
  port: PORT,
  root: '.',
  watch: true,
  watchDirs: ['public/pages', 'public/assets'],
  srcDirs: ['public/assets/scripts', 'public/pages/components'],
})

const origStart = server.start.bind(server)
server.start = () => {
  origStart()

  if (server._server) {
    server._server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.error(`  ❌ Port ${PORT} is already in use\n`)
      }
    })
    server._server.on('listening', () => {
      const url = `http://127.0.0.1:${PORT}/`
      console.log(`\n  >>> ${url}`)
      console.log(`  (auto-opening browser...)\n`)
      exec(`start "" "${url}"`, { shell: true, detached: true })
    })
  }

  return server
}

server.start()
