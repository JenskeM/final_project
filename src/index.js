import * as Sentry from "@sentry/node";
import 'dotenv/config';
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import usersRouter from './routes/users.js'
import reviesRouter from './routes/reviews.js'
import propertiesRouter from './routes/properties.js'
import hostsRouter from './routes/hosts.js'
import bookingsRouter from './routes/bookings.js'
import amenitiesRouter from './routes/amenities.js'
import loginRouter from './routes/login.js'

const app = express();

// Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());


// Resource routes
app.use("/users", usersRouter);
app.use("/reviews", reviesRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter)

// Login
app.use("/login", loginRouter);

// Trace errors
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
