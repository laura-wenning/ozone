'use strict'
import express from "express";
import httpErrors from "http-errors";
import pino from "pino";
import pinoHttp from "pino-http";

interface IOptions {
  port: number;
  host: string
}

module.exports = function main (options: IOptions, cb: () => void) {
  // Set default options
  const ready = cb;

  // Manually defined
  // TODO - pull from ENV if we can
  const opts = {
    port: 8000,
    host: "0.0.0.0" // Required to allow calls outside of docker ping this
  }

  const logger = pino()

  // Server state
  let server: any = null; // TODO - this is a Server type. Find where it's declared
  let serverStarted: boolean = false;
  let serverClosing: boolean = false;

  // Setup error handling
  function unhandledError (err: Error) {
    // Log the errors
    logger.error(err)

    // Only clean up once
    if (serverClosing) {
      return
    }
    serverClosing = true

    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1)
      })
    }
  }
  process.on('uncaughtException', unhandledError)
  process.on('unhandledRejection', unhandledError)

  // Create the express app
  const app = express()


  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }))

  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternativly, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.
  require('./routes')(app, opts)

  // Common error handlers
  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`))
  })
  app.use(function fiveHundredHandler (
    err: any, // TODO - find this type
    req: Express.Request,
    res: any, // TODO - this one too >_>
    next: any // TODO - find out type to this
  ) {
    if (err.status >= 500) {
      logger.error(err)
    }
    res.status(err.status || 500).json({
      messages: [{
        code: err.code || 'InternalServerError',
        message: err.message
      }]
    })
  })

  // Start server
  server = app.listen(opts.port, opts.host, function (err: any) {
    if (err) {
      return ready(err, app, server)
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'))
    }

    serverStarted = true
    const addr = server.address()
    logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`)
    ready(err, app, server)
  })
}

