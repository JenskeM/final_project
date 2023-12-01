// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as Sentry from "@sentry/node";
import { errorHandler } from "@sentry/node/types/handlers";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";

const app = express();

Sentry.init({
  dsn: 'https://dace5f337af0beba39a257c89bb69945@o4506082162769920.ingest.sentry.io/4506320026533888',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler)


app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
