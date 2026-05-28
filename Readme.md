# Backend Project (Production Grade)

This is a production-grade backend-centric project.

## Phase One: Project Setup

Phase One focused on preparing the base structure and development tooling for the backend project. The goal was to create a clean foundation before adding application logic, database connection code, routes, controllers, and middleware.

### 1. Initialized the Node.js project

The project was initialized with a `package.json` file.

Reason:

- `package.json` stores the project metadata, scripts, dependencies, and dev dependencies.
- It makes the project manageable through npm commands.
- It gives the backend a standard Node.js project structure.

Current project metadata includes:

- Project name: `backend-revision-project`
- Version: `1.0.0`
- Description: `backend project (production grade)`
- Author: `Sharv`
- License: `ISC`

### 2. Configured ES Modules

The project uses:

```json
"type": "module"
```

Reason:

- This allows the project to use modern JavaScript `import` and `export` syntax.
- It keeps the code style closer to current backend JavaScript standards.
- It avoids mixing CommonJS `require` syntax with ES module syntax later.

### 3. Added the first development script

During the initial setup, the project started with this development script:

```json
"dev": "nodemon src/index.js"
```

Reason:

- This command starts the backend from `src/index.js`.
- `nodemon` automatically restarts the server whenever source files change.
- It improves development speed because the server does not need to be restarted manually after every edit.

The development command was:

```bash
npm run dev
```

### 4. Installed development dependencies

The project currently has these dev dependencies:

```json
"devDependencies": {
  "nodemon": "^3.1.14",
  "prettier": "^3.8.3"
}
```

Reason:

- `nodemon` is used only during development to restart the server automatically.
- `prettier` is used only during development to format code consistently.
- These packages are not required for the backend to run in production, so they belong in `devDependencies`.

At this stage, there are no production `dependencies` yet because no runtime backend packages such as Express, Mongoose, JWT, or similar libraries have been added.

### 5. Created the package lock file

The `package-lock.json` file was generated after installing npm packages.

Reason:

- It records the exact installed package versions.
- It helps keep installs consistent across machines.
- It makes the project more reliable when another developer or deployment environment runs `npm install`.

### 6. Added Prettier configuration

A `.prettierrc` file was added with formatting rules:

```json
{
  "singleQuote": false,
  "bracketSpacing": true,
  "tabWidth": 2,
  "semi": true,
  "trailingComma": "es5"
}
```

Reason:

- It keeps formatting consistent across the whole project.
- It avoids style confusion while writing backend code.
- It makes future files easier to read and maintain.

Formatting choices:

- Double quotes are preferred over single quotes.
- Semicolons are required.
- Indentation uses 2 spaces.
- Spaces are added inside object brackets.
- Trailing commas are added where valid in ES5.

### 7. Added Prettier ignore rules

A `.prettierignore` file was added to prevent Prettier from formatting files and folders that should not be touched.

Ignored items include:

- `.vscode`
- `node_modules`
- `dist`
- `.env` files

Reason:

- `node_modules` contains installed third-party packages and should never be formatted manually.
- `dist` usually contains generated build output.
- `.env` files contain environment variables and should not be changed by a formatter.
- Editor-specific folders like `.vscode` do not need project formatting.

### 8. Added Git ignore rules

A `.gitignore` file was added for a Node.js backend project.

Reason:

- It prevents unnecessary or sensitive files from being committed.
- It keeps the repository clean.
- It avoids committing installed packages, logs, build output, cache folders, and environment files.

Important ignored items include:

- `node_modules`
- `.env`
- Logs
- Cache folders
- Build output such as `dist`
- Test coverage output

### 9. Added environment file support

An `.env` file exists locally for environment variables.

Reason:

- Backend projects usually need private configuration such as database URLs, ports, API keys, access token secrets, and refresh token secrets.
- These values should stay outside the source code.
- The `.env` file is ignored by Git so private values are not pushed to the repository.

Note: The actual contents of `.env` should not be documented or committed.

### 10. Created the source folder structure

The `src` folder was prepared with the main backend structure:

```txt
src/
  app.js
  constants.js
  index.js
  controllers/
  db/
  middlewares/
  models/
  routes/
  utils/
```

Reason:

- `index.js` will act as the main entry point of the server.
- `app.js` will hold the Express app configuration once Express is added.
- `constants.js` will store reusable constant values.
- `controllers` will contain request handling logic.
- `db` will contain database connection logic.
- `middlewares` will contain custom middleware.
- `models` will contain database models.
- `routes` will contain API route definitions.
- `utils` will contain helper functions and reusable utilities.

This structure keeps the backend organized as it grows.

### 11. Added public temp folder tracking

The project includes:

```txt
public/temp/.gitkeep
```

Reason:

- Git does not track empty folders by default.
- `.gitkeep` keeps the `public/temp` folder available in the repository.
- This folder can later be used for temporary files, such as uploaded files before they are processed or moved.

## Phase Two: Database Connection

Phase Two focused on connecting the backend project to MongoDB. In this phase, runtime dependencies were added, environment variables were loaded, the database name was moved into a constant, and the MongoDB connection logic was separated into its own `db` module.

### 1. Installed runtime dependencies

The project now includes these production dependencies:

```json
"dependencies": {
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "mongoose": "^9.6.2"
}
```

Reason:

- `dotenv` loads environment variables from the `.env` file into `process.env`.
- `mongoose` is used to connect the Node.js backend with MongoDB.
- `express` is installed for the upcoming server and API setup.

These packages are in `dependencies` because they are needed by the actual backend application, not only during development.

### 2. Updated the development script

The `dev` script now starts the app with `nodemon` and preloads dotenv support:

```json
"dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
```

Reason:

- `nodemon` restarts the server whenever files change.
- `-r dotenv/config` preloads dotenv before the app runs.
- `src/index.js` remains the main backend entry point.

The project can be started with:

```bash
npm run dev
```

### 3. Added a database name constant

The `src/constants.js` file now exports the database name:

```js
export const DB_NAME = "chaiaurcode";
```

Reason:

- Keeping the database name in one file avoids hardcoding it in multiple places.
- If the database name changes later, it only needs to be updated in one place.
- Constants make the code easier to read and maintain.

### 4. Added MongoDB connection logic

A new database connection file was added:

```txt
src/db/index.js
```

Current code:

```js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstaince = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(connectionInstaince.connection.host);
  } catch (error) {
    console.log("Mogodb connection FAILED : ", error);
    process.exit(1);
  }
};

export default connectDB;
```

Reason:

- Database connection code is kept separate from the main entry file.
- `mongoose.connect()` connects the app to MongoDB using the MongoDB URI from `.env`.
- `DB_NAME` is appended to the MongoDB URI so the app connects to the correct database.
- `try...catch` handles connection errors instead of allowing the app to fail silently.
- `process.exit(1)` stops the app when the database connection fails, because the backend should not keep running without a database connection.

Note: `connectionInstaince` is the connection response returned by Mongoose. It can be used to access connection details such as:

```js
connectionInstaince.connection.host;
```

### 5. Loaded environment variables in the app entry point

The `src/index.js` file now loads environment variables and then calls the database connection function:

```js
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();
```

Reason:

- `dotenv.config()` loads variables from `.env`.
- `path: "./.env"` tells dotenv exactly where the environment file is.
- `connectDB()` is called after dotenv is configured, so `process.env.MONGODB_URI` is available before Mongoose tries to connect.

### 6. Added MongoDB URI in environment variables

The `.env` file is used to store sensitive configuration like:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>
```

Reason:

- The MongoDB connection string contains private credentials.
- Keeping it in `.env` prevents secrets from being hardcoded in source files.
- `.env` is ignored by Git, so these values should not be committed.

Important:

- The MongoDB URI must start with `mongodb://` or `mongodb+srv://`.
- If the URI starts with anything else, Mongoose will throw a `MongoParseError`.
- The database name is added separately from `DB_NAME`, so the URI itself should contain the cluster connection string.

### 7. Used a professional project structure

Instead of writing the whole connection logic directly inside `src/index.js`, the connection code was moved into:

```txt
src/db/index.js
```

Reason:

- `src/index.js` stays clean and focused on starting the app.
- `src/db/index.js` owns database connection logic.
- This structure scales better when the project grows.
- It is easier to debug, test, and maintain separate modules.

## Phase Three: Express App Setup and Utility Classes

Phase Three focused on preparing the Express application for real API development. In this phase, the backend was connected to an Express app instance, common middleware was configured, and reusable utility helpers were added for async request handling, API errors, and API responses.

### 1. Installed additional runtime dependencies

The project now includes these additional backend packages:

```json
"cookie-parser": "^1.4.7",
"cors": "^2.8.6"
```

Reason:

- `cors` is used to control which frontend origins can access the backend API.
- `cookie-parser` allows the backend to read cookies from incoming requests.
- These packages are runtime dependencies because they are needed when the backend server is actually running.

### 2. Created the Express app configuration file

The `src/app.js` file now creates and exports the Express app:

```js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

export { app };
```

Reason:

- Keeping the Express app in `app.js` separates app configuration from server startup.
- `index.js` can focus on connecting the database and starting the server.
- This structure keeps the project easier to maintain as routes, middleware, and controllers are added.

### 3. Added CORS middleware

The app now uses:

```js
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
```

Reason:

- CORS controls which frontend application is allowed to communicate with this backend.
- `origin: process.env.CORS_ORIGIN` keeps the allowed frontend URL configurable through environment variables.
- `credentials: true` allows cookies and authorization credentials to be sent with requests when needed.
- This is important for authentication flows that use cookies or sessions.

### 4. Added JSON body parsing

The app now uses:

```js
app.use(express.json({ limit: "20kb" }));
```

Reason:

- This allows Express to read JSON data from request bodies.
- Without this middleware, `req.body` would not contain parsed JSON data.
- The `20kb` limit protects the server from accepting unnecessarily large JSON payloads.

### 5. Added URL-encoded body parsing

The app now uses:

```js
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
```

Reason:

- This allows Express to read form data sent using `application/x-www-form-urlencoded`.
- `extended: true` allows nested objects to be parsed from form data.
- The `20kb` limit keeps request body size controlled.

### 6. Added static file serving

The app now uses:

```js
app.use(express.static("public"));
```

Reason:

- This makes files inside the `public` folder available as static assets.
- It prepares the backend to serve files such as images, temporary uploads, or other public resources.
- This matches the earlier project structure where `public/temp` was created.

### 7. Added cookie parsing

The app now uses:

```js
app.use(cookieParser());
```

Reason:

- This middleware parses cookies from incoming requests.
- It makes cookie values available on `req.cookies`.
- This is useful for authentication features such as refresh tokens, access tokens, or session-style login flows.

### 8. Connected the Express app with database startup

The `src/index.js` file now imports the app and starts the server only after the database connection succeeds:

```js
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed !!! ", error);
  });
```

Reason:

- The server should start only after MongoDB is connected successfully.
- If the database connection fails, the backend should not pretend to be ready.
- This startup flow makes the app more reliable because API requests will only be accepted after the database layer is available.

### 9. Added async request handler utility

A reusable async handler was added in:

```txt
src/utils/asyncHandler.js
```

Current code:

```js
const asyncHandler = (requestHandler) =>
  async (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };

export { asyncHandler };
```

Reason:

- Express route handlers often use async database calls.
- Async errors need to be passed to `next(error)` so Express can handle them properly.
- Without a helper, every controller would need repeated `try...catch` blocks.
- `Promise.resolve()` allows the utility to handle both normal return values and promises.
- This keeps controller code cleaner and more focused on business logic.

Example use:

```js
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
```

### 10. Added custom API error class

A reusable error class was added in:

```txt
src/utils/ApiError.js
```

Current code:

```js
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
```

Reason:

- Built-in JavaScript errors do not automatically include API-specific fields like `statusCode`, `success`, or `errors`.
- `ApiError` creates a consistent error object for the whole backend.
- `statusCode` helps decide the HTTP response code.
- `success: false` clearly marks the response as failed.
- `errors` can store extra validation or field-level error details.
- `Error.captureStackTrace()` keeps useful debugging information while avoiding unnecessary constructor details in the stack trace.

Example use:

```js
throw new ApiError(404, "User not found");
```

### 11. Added custom API response class

A reusable response class was added in:

```txt
src/utils/ApiResponse.js
```

Current code:

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
```

Reason:

- API responses should follow a consistent structure.
- `ApiResponse` keeps successful responses predictable across controllers.
- `statusCode` stores the HTTP status code.
- `data` stores the actual response payload.
- `message` provides a human-readable response message.
- `success` is calculated from the status code, so responses below `400` are treated as successful.

Example use:

```js
return res
  .status(200)
  .json(new ApiResponse(200, user, "User fetched successfully"));
```

### 12. Improved project separation of concerns

The backend now separates responsibilities across files:

```txt
src/
  app.js              Express app and middleware configuration
  index.js            Environment setup, database connection, server startup
  db/index.js         MongoDB connection logic
  utils/              Reusable helper classes and functions
```

Reason:

- Each file has a clear responsibility.
- The entry point does not become crowded with middleware and utility logic.
- Utilities can be reused by future controllers, routes, and middleware.
- This structure is easier to scale as the backend grows.

## Current Status

Phase One, Phase Two, and Phase Three are complete. The project now has a production-style folder structure, MongoDB connection setup, Express app configuration, common middleware, and reusable API utility helpers. The next phase can focus on creating models, controllers, routes, and centralized error-handling middleware.
