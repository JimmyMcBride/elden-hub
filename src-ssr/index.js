/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Note: This file is used only for PRODUCTION. It is not picked up while in dev mode.
 *   If you are looking to add common DEV & PROD logic to the express app, then use
 *   "src-ssr/extension.js"
 */

// const express = require('express')
// const compression = require('compression')

// const ssr = require('quasar-ssr')
// const extension = require('./extension')
// const app = express()
// const port = proceiss.env.PORT || 3000

const functions = require("firebase-functions"),
  express = require("express"),
  compression = require("compression")

const ssr = require("../ssr"),
  extension = require("./extension"),
  funcs = require("./functions"),
  app = express()

const serve = (path, cache) =>
  express.static(ssr.resolveWWW(path), {
    maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0,
  })

// gzip
app.use(compression({ threshold: 0 }))

// serve this with no cache, if built with PWA:
if (ssr.settings.pwa) {
  app.use("/service-worker.js", serve("service-worker.js"))
}

// serve "www" folder
app.use("/", serve(".", true))

// we extend the custom common dev & prod parts here
extension.extendApp({ app })

// this should be last get(), rendering with SSR
app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  ssr.renderToString({ req, res }, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url)
      } else if (err.code === 404) {
        res.status(404).send("404 | Page Not Found")
      } else {
        // Render Error Page or Redirect
        res.status(500).send("500 | Internal Server Error")
        if (ssr.settings.debug) {
          console.error(`500 on ${req.url}`)
          console.error(err)
          console.error(err.stack)
        }
      }
    } else {
      res.send(html)
    }
  })
})

exports.ssrapp = functions.https.onRequest(app)

exports.helloWorld = funcs.helloWorld
exports.addMessage = funcs.addMessage
