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

## Current Status

Phase One and Phase Two are complete. The project now has a basic production-style backend structure and a MongoDB connection setup. The next phase can focus on creating the Express app, adding middleware, defining routes, and building models and controllers.
