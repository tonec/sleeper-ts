import 'babel-polyfill'
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import favicon from 'serve-favicon'
import { createMemoryHistory } from 'history'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import { trigger } from 'redial'
import PrettyError from 'pretty-error'
import render from 'helpers/render'
import createStore from 'redux/store'
import { asyncMatchRoutes } from 'utils'
import routes from './routes'
import config from '../config'

const PUBLIC_PATH = path.resolve(__dirname, '../public')
const FAVICON = path.join(PUBLIC_PATH, 'favicon.ico')
const MANIFEST = path.join(PUBLIC_PATH, 'manifest.json')

const app = express()
const pretty = new PrettyError()

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, pretty.render(reason))
})

app.use(helmet({ contentSecurityPolicy: false }))
  .use(cookieParser())
  .use(compression())
  .use(favicon(FAVICON))
  .use('/manifest.json', (req, res) => res.sendFile(MANIFEST))

app.use(express.static('public'))

app.use('/app-shell', (req, res) => {
  res.send(render())
})

app.get('*', async (req, res) => {
  const memHistory = createMemoryHistory({ initialEntries: [req.originalUrl] })
  const history = qhistory(memHistory, stringify, parse)
  const { components, match, params } = await asyncMatchRoutes(routes, req.path)
  const store = createStore({ history, match, params })

  const locals = {
    history,
    store,
    match,
    params
  }

  trigger('fetch', components, locals).then(() => {
    const routerContext = {}
    const appContent = render(req, store, history, routerContext)

    if (routerContext.notFound) {
      res.status(404)
    }

    res.send(appContent)
  })
})

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`)
})
