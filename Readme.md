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

### 3. Added a development script

The `package.json` file includes:

```json
"dev": "nodemon src/index.js"
```

Reason:

- This command starts the backend from `src/index.js`.
- `nodemon` automatically restarts the server whenever source files change.
- It improves development speed because the server does not need to be restarted manually after every edit.

The development command will be:

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

## Current Status

Phase One is complete as a setup phase. The project is ready for the next step: adding the actual backend server logic, installing runtime dependencies, connecting the database, and building routes, controllers, models, and middleware.
