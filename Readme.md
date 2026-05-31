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

## Phase Three: App Configuration, Utilities, and Models

Phase Three focused on preparing the backend for real API features. In this phase, the Express app was configured, reusable API utilities were added, authentication-related libraries were installed, and the first Mongoose models were created for users and videos.

### 1. Installed additional runtime dependencies

The project now includes these additional production dependencies:

```json
"bcrypt": "^6.0.0",
"cookie-parser": "^1.4.7",
"cors": "^2.8.6",
"jsonwebtoken": "^9.0.3",
"mongoose-aggregate-paginate-v2": "^1.1.4"
```

Reason:

- `bcrypt` is used to hash user passwords before saving them in the database.
- `jsonwebtoken` is used to create access tokens and refresh tokens for authentication.
- `mongoose-aggregate-paginate-v2` is used to paginate aggregation results, especially useful for video feeds and search results.
- `cors` controls which frontend origins can access the backend.
- `cookie-parser` reads cookies from incoming requests.
- These libraries belong in `dependencies` because the running backend needs them.

### 2. Configured the Express app

The `src/app.js` file creates and exports the Express app:

```js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
```

Reason:

- `app.js` keeps middleware and Express configuration separate from server startup.
- `cors()` allows the selected frontend URL to communicate with the backend.
- `credentials: true` allows cookies or authorization credentials to be sent with requests.
- `express.json()` parses JSON request bodies and makes them available in `req.body`.
- `express.urlencoded()` parses form submissions and URL-encoded data.
- The `20kb` limit protects the server from unnecessarily large request bodies.
- `express.static("public")` serves public assets from the `public` folder.
- `cookieParser()` makes browser cookies available on `req.cookies`.

### 3. Started the server after database connection

The `src/index.js` file imports the Express app and starts listening only after MongoDB connects successfully:

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

- The backend should not accept requests until the database is ready.
- This flow prevents API handlers from running when MongoDB is unavailable.
- It keeps `index.js` focused on environment setup, database connection, and server startup.

### 4. Added async request handler utility

The `src/utils/asyncHandler.js` file contains a higher-order function:

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

- Controllers often contain async code such as database queries and file uploads.
- Async errors must be passed to `next(error)` so Express error middleware can handle them.
- This utility avoids writing repeated `try...catch` blocks in every controller.
- `Promise.resolve()` allows the handler to work with both normal values and promises.

Usage:

```js
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find();
  res.status(200).json(videos);
});
```

### 5. Added custom API error class

The `src/utils/ApiError.js` file defines a custom error class:

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

- Normal JavaScript errors do not include API response fields like `statusCode`, `success`, `data`, or `errors`.
- `ApiError` creates a consistent structure for failed API responses.
- `statusCode` tells the server which HTTP status code should be sent.
- `success: false` clearly marks the response as failed.
- `errors` can store validation errors or multiple field-level errors.
- `Error.captureStackTrace()` records where the error came from while keeping the stack trace cleaner.

Usage:

```js
throw new ApiError(404, "User not found");
```

### 6. Added custom API response class

The `src/utils/ApiResponse.js` file defines a reusable response wrapper:

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

- Successful API responses should follow one predictable structure.
- `statusCode` stores the HTTP status code.
- `data` stores the main response payload.
- `message` provides a readable response message.
- `success` is calculated from the status code, where codes below `400` are treated as successful.

Usage:

```js
return res
  .status(200)
  .json(new ApiResponse(200, user, "User fetched successfully"));
```

### 7. Created the user model

The `src/models/user.model.js` file defines the `User` schema and model:

```js
export const User = mongoose.model("User", userSchema);
```

Main fields:

- `username`: unique username, stored in lowercase, trimmed, required, and indexed for faster searching.
- `email`: unique email, stored in lowercase, trimmed, and required.
- `fullName`: required display name, trimmed, and indexed for search.
- `avatar`: required Cloudinary URL for the user's profile image.
- `coverImage`: optional Cloudinary URL for the user's cover image.
- `watchHistory`: array of video object IDs for tracking watched videos.
- `password`: required hashed password.
- `refreshToken`: stores the latest refresh token when refresh-token based login is implemented.

Reason:

- The user model stores identity, login, profile, and watch-history data.
- `unique` prevents duplicate usernames and emails.
- `lowercase` keeps username and email comparisons consistent.
- `trim` removes unnecessary spaces before saving.
- `index` improves search performance on fields that may be queried frequently.
- `timestamps: true` automatically adds `createdAt` and `updatedAt`.

### 8. Used Mongoose schema features

The user and video models use Mongoose schema options and field validators.

Important components:

- `type` defines the JavaScript/MongoDB data type for a field.
- `required` makes a field mandatory.
- `unique` asks MongoDB to keep values unique through an index.
- `lowercase` converts string values to lowercase before saving.
- `trim` removes extra spaces from string values.
- `index` creates an index for faster searching.
- `default` provides a value when the field is not sent.
- `ref` creates a relationship reference between collections.
- `timestamps: true` automatically manages `createdAt` and `updatedAt`.

Reason:

- These schema options keep data cleaner and more predictable.
- Validation rules reduce bad data entering the database.
- References make it possible to connect users with videos.
- Timestamps help track when records are created and updated.

### 9. Added password hashing with bcrypt

The user model uses a Mongoose pre-save hook:

```js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});
```

Reason:

- Passwords should never be stored as plain text.
- The `pre("save")` hook runs before a user document is saved.
- `this.isModified("password")` prevents re-hashing the password when other user fields are updated.
- `bcrypt.hash(password, 10)` creates a secure one-way hash using 10 salt rounds.

Usage:

```js
const user = await User.create({
  username,
  email,
  fullName,
  avatar,
  password,
});
```

When the user is saved, the password is hashed automatically by the pre-save hook.

### 10. Added password comparison method

The user model has an instance method:

```js
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
```

Reason:

- During login, the backend receives a plain password from the user.
- The database stores only the hashed password.
- `bcrypt.compare()` safely checks whether the entered password matches the saved hash.
- Keeping this logic as a model method makes controllers cleaner.

Usage:

```js
const isPasswordValid = await user.isPasswordCorrect(password);
```

### 11. Added access token generation method

The user model has this instance method:

```js
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
```

Reason:

- An access token proves that the user is logged in.
- The token payload stores safe identifying information such as user ID, email, username, and full name.
- `ACCESS_TOKEN_SECRET` signs the token so the backend can verify that it was created by this app.
- `ACCESS_TOKEN_EXPIRY` controls how long the access token remains valid.

Usage:

```js
const accessToken = await user.generateAccessToken();
```

### 12. Added refresh token generation method

The user model has this instance method:

```js
userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
```

Reason:

- Refresh tokens are used to generate new access tokens without asking the user to log in again.
- The refresh token payload is smaller because it only needs the user ID.
- `REFRESH_TOKEN_SECRET` signs refresh tokens separately from access tokens.
- `REFRESH_TOKEN_EXPIRY` is usually longer than access token expiry.
- Storing the refresh token in the user document allows logout and token rotation flows later.

Usage:

```js
const refreshToken = await user.generateRefreshToken();
user.refreshToken = refreshToken;
await user.save({ validateBeforeSave: false });
```

### 13. Required authentication environment variables

The JWT methods expect these variables in `.env`:

```env
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

Reason:

- Secrets should not be hardcoded in source files.
- Different secrets for access and refresh tokens improve security separation.
- Expiry values allow the login system to control token lifetime without code changes.

### 14. Created the video model

The `src/models/video.model.js` file defines the `Video` schema and model:

```js
export const Video = mongoose.model("Video", videoSchema);
```

Main fields:

- `viedoFile`: required Cloudinary URL for the uploaded video file.
- `thumbnail`: required Cloudinary URL for the video thumbnail.
- `title`: required video title.
- `description`: required video description.
- `duration`: required video duration, usually returned by Cloudinary.
- `views`: number of views, defaulting to `0`.
- `isPublished`: publishing status, defaulting to `true`.
- `owner`: object ID reference to the user who uploaded the video.

Reason:

- The video model stores all core video metadata.
- Cloudinary URLs are stored instead of raw files because media files should live in external storage.
- `views` starts from `0` so a new video has a valid default count.
- `isPublished` allows videos to be hidden or shown without deleting them.
- `owner` connects each video to the user who uploaded it.
- `timestamps: true` records upload and update times.

### 15. Added owner relationship between videos and users

The video schema stores the owner using an ObjectId reference:

```js
owner: {
  type: Schema.Types.ObjectId,
  ref: User,
}
```

Reason:

- A video should belong to a user.
- ObjectId references allow MongoDB documents to stay separate while still being connected.
- This makes it possible to fetch video owner details later using `populate()` or aggregation.

Usage:

```js
const video = await Video.findById(videoId).populate("owner");
```

### 16. Added aggregate pagination plugin

The video schema uses:

```js
videoSchema.plugin(mongooseAggregatePaginate);
```

Reason:

- Video feeds, search pages, and channel videos can return many records.
- Pagination prevents sending all videos at once.
- Aggregation is useful when filtering, sorting, joining owner details, or calculating extra fields.
- `mongoose-aggregate-paginate-v2` adds an `aggregatePaginate()` method to the `Video` model.

Usage:

```js
const aggregate = Video.aggregate([
  {
    $match: {
      isPublished: true,
    },
  },
]);

const videos = await Video.aggregatePaginate(aggregate, {
  page: 1,
  limit: 10,
});
```

The result includes pagination information such as:

- `docs`
- `totalDocs`
- `limit`
- `page`
- `totalPages`
- `hasNextPage`
- `hasPrevPage`

### 17. Improved project separation of concerns

The backend now separates responsibilities across files:

```txt
src/
  app.js              Express app and middleware configuration
  index.js            Environment setup, database connection, server startup
  db/index.js         MongoDB connection logic
  models/             Mongoose schemas and models
  utils/              Reusable helper classes and functions
```

Reason:

- Each file has a clear responsibility.
- Models own database structure and model methods.
- Utilities own reusable request, response, and error helpers.
- The entry point stays focused on bootstrapping the server.
- This structure is easier to scale as controllers, routes, middleware, and services are added.

## Phase Four: File Upload Handling and Cloudinary Integration

Phase Four focused on preparing the backend to receive files from users and upload those files to Cloudinary. This is an important step before building user registration, profile image upload, cover image upload, video upload, and thumbnail upload APIs.

In this phase, two main pieces were added:

- `multer` for accepting multipart/form-data file uploads from incoming HTTP requests.
- `cloudinary` for storing uploaded media files outside the backend server.

The goal is to keep the backend server responsible for processing requests, while Cloudinary handles long-term media storage and delivery.

### 1. Installed file upload and media storage dependencies

The project now includes these additional production dependencies:

```json
"cloudinary": "^2.10.0",
"multer": "^2.1.1"
```

Reason:

- `multer` is middleware for handling `multipart/form-data`, which is the format used when files are uploaded from forms or API clients.
- `cloudinary` is the official Cloudinary SDK used to upload files from the backend to a Cloudinary account.
- These packages are runtime dependencies because file upload features need them while the backend is running.

### 2. Created Multer middleware

A new middleware file was added:

```txt
src/middlewares/multer.middleware.js
```

Current code:

```js
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
```

Reason:

- `multer.diskStorage()` tells Multer to temporarily store uploaded files on the local disk.
- `destination` decides where the uploaded file should be saved.
- `filename` decides what name the temporary file should use.
- `file.originalname` keeps the file name sent by the client.
- Exporting `upload` allows route files to use this middleware before a controller runs.

### 3. Stored temporary files in the public temp folder

Uploaded files are saved temporarily inside:

```txt
public/temp
```

Reason:

- The backend needs a local file path before it can upload that file to Cloudinary.
- Multer first receives the file from the request and writes it to `public/temp`.
- The Cloudinary utility can then read the temporary file from disk and upload it.
- This folder is for short-lived files only, not permanent storage.

Expected upload flow:

```txt
Client sends file
        |
        v
Multer receives multipart/form-data
        |
        v
File is saved temporarily in public/temp
        |
        v
Cloudinary utility uploads file to Cloudinary
        |
        v
Cloudinary URL is saved in MongoDB
```

### 4. Added Cloudinary utility

A new utility file was added:

```txt
src/utils/cloudinary.js
```

Current code:

```js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_APT_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file is uploaded on cloudinary ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;
```

Reason:

- The Cloudinary SDK is configured once using environment variables.
- `uploadOnCloudinary()` accepts a local file path generated by Multer.
- If no file path is received, the function returns `null`.
- `cloudinary.uploader.upload()` uploads the file to Cloudinary.
- `resource_type: "auto"` allows Cloudinary to automatically detect whether the file is an image, video, or another supported asset type.
- The Cloudinary response includes useful information such as the file URL, public ID, resource type, format, size, and duration for videos.
- If the upload fails, the temporary local file is removed using `fs.unlinkSync()`.

Important implementation note:

- The environment variable name used in `.env` must exactly match the name used in `process.env`.
- The standard secret variable name should be `CLOUDINARY_API_SECRET`.
- If the code uses a misspelled key such as `CLOUDINARY_APT_SECRET`, Cloudinary authentication will fail unless the `.env` file uses the same misspelled name.
- `uploadOnCloudinary()` is exported as a default export, so it can be imported into controllers without curly braces.

### 5. Recommended Cloudinary environment variables

The Cloudinary utility should use these values in `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Reason:

- `CLOUDINARY_CLOUD_NAME` identifies the Cloudinary product environment.
- `CLOUDINARY_API_KEY` identifies the API client.
- `CLOUDINARY_API_SECRET` signs secure API requests.
- These values are private account credentials and should never be committed to Git.

The `.env` file should stay ignored by Git.

### 6. How Multer will be used in routes

The exported `upload` middleware can be used when defining routes.

For a single file upload:

```js
router.route("/avatar").post(upload.single("avatar"), updateAvatar);
```

Reason:

- `upload.single("avatar")` expects one uploaded file with the form field name `avatar`.
- Multer adds the uploaded file information to `req.file`.
- The controller can access the temporary file path with `req.file.path`.

Example controller usage:

```js
import uploadOnCloudinary from "../utils/cloudinary.js";

const avatarLocalPath = req.file?.path;
const avatar = await uploadOnCloudinary(avatarLocalPath);
```

For multiple named file fields:

```js
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
```

Reason:

- `upload.fields()` allows a request to upload multiple file fields.
- This is useful for user registration where an avatar may be required and a cover image may be optional.
- Multer adds uploaded file information to `req.files`.

Example controller access:

```js
const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
```

### 7. Why files are uploaded to Cloudinary instead of MongoDB

The database should store file metadata and URLs, not large media files.

Reason:

- MongoDB documents should stay focused on application data.
- Large image and video files can make the database heavy and expensive to manage.
- Cloudinary is built for storing, optimizing, transforming, and delivering media files.
- Cloudinary can return secure URLs that can be saved in user and video documents.
- This keeps the backend more scalable and keeps media delivery faster.

Example database values:

```js
avatar: "https://res.cloudinary.com/<cloud-name>/image/upload/...",
coverImage: "https://res.cloudinary.com/<cloud-name>/image/upload/...",
videoFile: "https://res.cloudinary.com/<cloud-name>/video/upload/...",
thumbnail: "https://res.cloudinary.com/<cloud-name>/image/upload/...",
```

### 8. Connection with existing models

The existing models are already designed to store Cloudinary URLs.

In the user model:

```js
avatar: {
  type: String,
  required: true,
},
coverImage: {
  type: String,
},
```

Reason:

- `avatar` stores the uploaded profile image URL.
- `coverImage` stores the uploaded cover image URL.
- These values should come from the Cloudinary upload response.

In the video model:

```js
viedoFile: {
  type: String,
  required: true,
},
thumbnail: {
  type: String,
  required: true,
},
duration: {
  type: Number,
  required: true,
},
```

Reason:

- `viedoFile` stores the uploaded video URL.
- `thumbnail` stores the uploaded thumbnail URL.
- `duration` can be taken from the Cloudinary response for uploaded videos.

Note: The field name `viedoFile` appears to be a typo for `videoFile`. If this field is renamed later, all controller code and existing database references should be updated together.

### 9. Expected Cloudinary upload response usage

After a successful upload, Cloudinary returns a response object.

Useful properties can include:

- `url`
- `secure_url`
- `public_id`
- `resource_type`
- `format`
- `bytes`
- `duration`

Recommended usage:

```js
const uploadedFile = await uploadOnCloudinary(localFilePath);

if (!uploadedFile) {
  throw new ApiError(400, "File upload failed");
}

const fileUrl = uploadedFile.secure_url;
```

Reason:

- `secure_url` is usually preferred because it uses HTTPS.
- `public_id` is useful if the asset needs to be deleted or transformed later.
- `duration` is useful for video uploads.
- Checking for a missing response helps controllers fail clearly when uploads do not work.

### 10. Cleanup responsibility

Temporary local files should not remain in `public/temp` after they are uploaded.

Current behavior:

- If Cloudinary upload fails, the helper removes the temporary file in the `catch` block.

Recommended behavior:

- Remove the temporary local file after a successful Cloudinary upload as well.
- This prevents the server from slowly filling up with old upload files.

Example:

```js
const response = await cloudinary.uploader.upload(localFilePath, {
  resource_type: "auto",
});

fs.unlinkSync(localFilePath);
return response;
```

Reason:

- Multer's local file is only needed until Cloudinary finishes uploading it.
- Once Cloudinary has the file, the local copy is unnecessary.
- Removing temporary files keeps the project cleaner and avoids storage issues.

### 11. Security and validation notes

File upload routes should be protected carefully.

Important points:

- Validate file type before trusting uploaded content.
- Limit file size to avoid very large uploads.
- Use authentication middleware on routes that upload user-specific files.
- Do not expose Cloudinary API secrets to frontend code.
- Store only Cloudinary URLs or public IDs in MongoDB.
- Use `secure_url` for HTTPS delivery.
- Clean temporary files after upload attempts.

Reason:

- File uploads can be abused if limits and validation are missing.
- API secrets must stay only on the backend.
- A clear upload pipeline helps avoid broken profile images, failed videos, and leftover temporary files.

### 12. Phase Four result

At the end of Phase Four, the backend has the foundation needed for media upload features:

- `multer` can accept files from incoming requests.
- Uploaded files can be temporarily stored in `public/temp`.
- The Cloudinary SDK can upload local files to a Cloudinary account.
- User and video models already have fields ready to store Cloudinary URLs.
- Future controllers can now combine Multer, Cloudinary, `ApiError`, and `ApiResponse` to build complete upload workflows.

## Phase Five: User API Route Setup

Phase Five focused on connecting the first real API endpoint. The backend now has a user controller, a user router, and a mounted API path in the main Express app.

This phase does not complete user registration yet. It creates the request pipeline so the next phase can safely add validation, database checks, file uploads, Cloudinary integration, and proper API responses.

### 1. Added the user controller

The user controller file was added here:

```txt
src/controllers/user.controller.js
```

Current code:

```js
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export { registerUser };
```

What this does:

- Imports the reusable `asyncHandler` utility.
- Creates a `registerUser` controller function.
- Wraps the controller with `asyncHandler` so future async errors can be forwarded properly.
- Sends a temporary success response with `{ "message": "ok" }`.
- Exports `registerUser` so the route file can use it.

Reason:

- Controllers should contain request-handling logic.
- Routes should stay small and only decide which controller should run.
- Registration will later need async operations such as checking MongoDB, uploading files to Cloudinary, hashing passwords, and creating a user document.

### 2. Added the user router

The user route file was added here:

```txt
src/routes/user.routes.js
```

Current code:

```js
import { Router } from "express";
import { app } from "../app.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

export default router;
```

What this does:

- Imports `Router` from Express.
- Creates a separate router for user-related endpoints.
- Imports the `registerUser` controller.
- Connects `POST /register` to the `registerUser` controller.
- Exports the router as the default export.

Reason:

- Keeping routes in separate files makes the backend easier to scale.
- All user endpoints can live inside `user.routes.js`.
- The route file does not need to know the full API path. It only defines the user-specific part, such as `/register`.

Important note:

- `import { app } from "../app.js";` is not needed in this route file.
- The router is mounted from `app.js`, so `user.routes.js` only needs `Router` and the controller imports.

Cleaner version:

```js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

export default router;
```

### 3. Mounted the user router in app.js

The main Express app now imports the user router:

```js
import userRouter from "./routes/user.routes.js";
```

Then it mounts the router:

```js
app.use("/api/v1/users", userRouter);
```

What this does:

- Adds a base path for all user routes.
- Sends requests that start with `/api/v1/users` to `userRouter`.
- Keeps API versioning in one clear place.

Reason:

- `/api/v1` makes the API version explicit.
- `/users` groups all user-related endpoints together.
- Future user routes such as login, logout, refresh token, profile update, and avatar update can be added to the same router.

### 4. Final endpoint created in this phase

The route declared in `user.routes.js` is:

```txt
POST /register
```

The base path declared in `app.js` is:

```txt
/api/v1/users
```

So the final endpoint becomes:

```txt
POST /api/v1/users/register
```

Request flow:

```txt
POST /api/v1/users/register
        |
        v
app.js matches /api/v1/users
        |
        v
user.routes.js matches /register
        |
        v
registerUser controller runs
        |
        v
Temporary response is returned
```

Current response:

```json
{
  "message": "ok"
}
```

### 5. How to test this phase

Start the server:

```bash
npm run dev
```

Send a POST request to:

```txt
http://localhost:8000/api/v1/users/register
```

Expected response:

```json
{
  "message": "ok"
}
```

If this response appears, it confirms that:

- The Express app is running.
- The user router is mounted correctly.
- The `/register` route is connected.
- The `registerUser` controller is being called.

### 6. What comes next

The next step is to replace the temporary response with full registration logic.

Expected registration flow:

```txt
Read username, email, fullName, and password from req.body
Validate required fields
Check whether username or email already exists
Read avatar and coverImage paths from req.files
Upload images to Cloudinary
Create the user in MongoDB
Remove password and refreshToken from the response
Return a structured ApiResponse
```

This phase prepares the routing foundation for that flow.

### 7. Phase Five result

At the end of Phase Five:

- `src/controllers/user.controller.js` has the first user controller.
- `src/routes/user.routes.js` has the first user route.
- `src/app.js` mounts all user routes under `/api/v1/users`.
- `POST /api/v1/users/register` is available.
- The current endpoint returns a temporary test response.

## Phase Six: User Registration Controller

Phase Six focuses on replacing the temporary registration response with real user registration logic. The backend now tries to receive user details, validate required fields, check whether the user already exists, accept avatar and cover image uploads, upload those images to Cloudinary, create the user in MongoDB, remove sensitive fields from the response, and return a structured API response.

This phase connects multiple parts of the backend together:

- `user.routes.js` decides which middleware and controller should run.
- `multer.middleware.js` reads uploaded files from `multipart/form-data`.
- `user.controller.js` contains the registration business logic.
- `user.model.js` defines how the user is saved and hashes the password before saving.
- `cloudinary.js` uploads local files to Cloudinary.
- `ApiError` creates consistent failed responses.
- `ApiResponse` creates consistent successful responses.
- `asyncHandler` forwards async errors to Express.

### 1. Updated the registration route with Multer

The route now uses `upload.fields()` before the controller:

```js
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
```

Reason:

- Registration needs text fields such as `username`, `email`, `fullName`, and `password`.
- Registration also needs image files such as `avatar` and optionally `coverImage`.
- Normal `express.json()` cannot parse file uploads.
- `multer` is used because file uploads are usually sent as `multipart/form-data`.
- `upload.fields()` is used because the request can contain more than one named file field.
- `avatar` has `maxCount: 1` because one user should have only one profile image.
- `coverImage` has `maxCount: 1` because one user should have only one cover image.
- Multer runs before `registerUser`, so the controller can read uploaded files from `req.files`.

### 2. Why `Router()` and `router.route().post()` are used

The route file uses Express Router:

```js
const router = Router();
```

Reason:

- `Router()` creates a mini Express router.
- User-related routes can stay inside `user.routes.js`.
- The main `app.js` only needs to mount the user router once.
- This keeps route files organized as the project grows.

The route is declared like this:

```js
router.route("/register").post(...)
```

Reason:

- `.route("/register")` groups handlers for the same path.
- `.post()` means this endpoint accepts HTTP POST requests.
- POST is used because registration creates a new database record.

The final endpoint is still:

```txt
POST /api/v1/users/register
```

Because `app.js` mounts the router here:

```js
app.use("/api/v1/users", userRouter);
```

### 3. Updated the registration controller

The controller now follows this larger flow:

```js
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = User.findOne({
    $or: [{ usernme }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});
```

Reason:

- The controller owns the registration business logic.
- Routes should not contain validation, database checks, upload logic, or response formatting.
- Keeping this logic in a controller makes the route easier to read.
- Wrapping the controller in `asyncHandler` avoids repeating `try...catch` in every async controller.

### 4. Why controller imports are needed

The controller imports these modules:

```js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
```

Reason:

- `asyncHandler` catches rejected promises and sends errors to Express through `next(error)`.
- `ApiError` is used when registration should stop with a clear HTTP error.
- `User` is the Mongoose model used to search and create users in MongoDB.
- `uploadOnCloudinary` moves uploaded files from local temp storage to Cloudinary.
- `ApiResponse` wraps successful responses in a consistent format.

### 5. Reading text fields from `req.body`

The controller reads user details like this:

```js
const { username, email, fullName, password } = req.body;
```

Reason:

- `req.body` contains text fields sent by the client.
- Object destructuring pulls only the required fields from the request body.
- This keeps the rest of the controller shorter and easier to read.

Advanced syntax explained:

```js
const { username, email } = req.body;
```

This means:

```js
const username = req.body.username;
const email = req.body.email;
```

Both versions do the same thing, but destructuring is cleaner when many fields are needed.

### 6. Validating required fields

The controller checks required fields like this:

```js
if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
  throw new ApiError(400, "All field are required");
}
```

Reason:

- A user should not be created with empty required fields.
- The array groups all required fields in one place.
- `.some()` checks whether at least one field fails the condition.
- `.trim()` removes spaces from the start and end of a string.
- `field?.trim()` prevents an immediate crash if `field` is `undefined` or `null`.
- Throwing `ApiError(400, ...)` tells the client the request data is invalid.

Advanced syntax explained:

```js
[fullName, email, username, password]
```

This creates an array of all required values.

```js
.some((field) => field?.trim() === "")
```

This loops through the array and returns `true` if any field becomes an empty string after trimming.

```js
field?.trim()
```

This is optional chaining. It means: call `.trim()` only if `field` exists. If `field` is `null` or `undefined`, JavaScript returns `undefined` instead of throwing an error.

Important note:

- This check catches empty strings like `""` and strings with only spaces like `"   "`.
- A stronger version should also catch missing fields directly, for example `!field`.

### 7. Checking if the user already exists

The controller checks MongoDB for an existing user:

```js
const existedUser = User.findOne({
  $or: [{ usernme }, { email }],
});
```

Reason:

- `User.findOne()` searches the users collection for one matching document.
- A new user should not be allowed to register with an already used username or email.
- `$or` is a MongoDB query operator.
- `$or` means either condition can match.
- If the username already exists, registration should fail.
- If the email already exists, registration should fail.

Advanced syntax explained:

```js
$or: [{ username }, { email }]
```

This means:

```txt
Find a user where username matches OR email matches.
```

Recommended corrected version:

```js
const existedUser = await User.findOne({
  $or: [{ username }, { email }],
});
```

Important implementation note:

- The current controller uses `User.findOne(...)` without `await`.
- Without `await`, `existedUser` stores a query object instead of the actual database result.
- The current controller also uses `usernme`, which appears to be a typo for `username`.
- These should be corrected before testing successful registration.

### 8. Reading uploaded file paths from `req.files`

After Multer runs, uploaded file information is available in `req.files`:

```js
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
```

Reason:

- Multer stores uploaded files temporarily in `public/temp`.
- The controller needs the local file path before uploading to Cloudinary.
- `avatarLocalPath` is required because the user schema requires `avatar`.
- `coverImageLocalPath` is optional because the user schema does not require `coverImage`.

Advanced syntax explained:

```js
req.files?.avatar[0]?.path
```

This reads:

```txt
From req.files, get avatar, then get the first uploaded avatar file, then get its path.
```

Recommended safer version:

```js
const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
```

Reason:

- `avatar?.[0]` safely handles the case where `avatar` is missing.
- Without the extra `?.`, `req.files?.avatar[0]` can still crash if `avatar` does not exist.

### 9. Requiring an avatar image

The controller stops registration if no avatar file exists:

```js
if (!avatarLocalPath) {
  throw new ApiError(400, "Avatar file is required");
}
```

Reason:

- The user model has `avatar` as a required field.
- The app expects every registered user to have a profile image.
- It is better to fail early before creating a database record with missing profile data.

### 10. Uploading images to Cloudinary

The controller uploads local files:

```js
const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);
```

Reason:

- Multer only saves files temporarily on the backend server.
- Cloudinary stores the files permanently and returns a URL.
- MongoDB should store the Cloudinary URL, not the raw image file.
- `await` is required because uploading to Cloudinary is asynchronous.

Advanced syntax explained:

```js
await uploadOnCloudinary(avatarLocalPath)
```

This means JavaScript pauses this async function until Cloudinary finishes uploading and returns a response.

The controller checks the avatar upload:

```js
if (!avatar) {
  throw new ApiError(400, "Avatar is required");
}
```

Reason:

- Even if a local avatar file exists, the Cloudinary upload can fail.
- The user should not be created if the required avatar cannot be uploaded.

### 11. Creating the user in MongoDB

The controller creates the user:

```js
const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase(),
});
```

Reason:

- `User.create()` creates and saves a new user document in MongoDB.
- `fullName`, `email`, `password`, and `username` come from the request body.
- `avatar` and `coverImage` come from Cloudinary upload responses.
- `username.toLowerCase()` keeps usernames consistent.
- The user model's `pre("save")` hook hashes the password before it is saved.

Advanced syntax explained:

```js
coverImage: coverImage?.url || ""
```

This means:

```txt
If coverImage exists and has a url, use that url.
Otherwise, save an empty string.
```

This is useful because cover image upload is optional.

Important note:

- `avatar.url` works, but `avatar.secure_url` is usually better because it uses HTTPS.
- The same applies to `coverImage?.url`.

### 12. How password hashing happens automatically

The controller sends the plain password to `User.create()`, but the model hashes it before saving:

```js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

Reason:

- Passwords should never be stored as plain text.
- Mongoose middleware allows password hashing to live in the model instead of the controller.
- This keeps password protection automatic whenever a user is saved.

Advanced syntax explained:

```js
function (next) { ... }
```

A normal function is used here instead of an arrow function because Mongoose sets `this` to the current user document. An arrow function would not have its own `this`.

```js
this.isModified("password")
```

This checks whether the password field has changed. If the password did not change, the hook skips hashing to avoid hashing an already hashed password again.

```js
bcrypt.hash(this.password, 10)
```

This creates a one-way hashed password. The number `10` is the salt rounds value. Higher numbers are slower but harder to brute force.

### 13. Removing sensitive fields from the response

After creating the user, the controller fetches the user again:

```js
const createdUser = await User.findById(user._id).select("-password -refreshToken");
```

Reason:

- The created database document contains sensitive fields.
- The API response should not send `password` back to the client.
- The API response should not send `refreshToken` back during registration.
- `.select("-password -refreshToken")` tells Mongoose to exclude those fields.

Advanced syntax explained:

```js
.select("-password -refreshToken")
```

The minus sign means exclude this field from the result.

This:

```txt
-password -refreshToken
```

Means:

```txt
Return all selected user fields except password and refreshToken.
```

### 14. Checking that the user was created

The controller checks:

```js
if (!createdUser) {
  throw new ApiError(500, "Something went wrong while registering the user");
}
```

Reason:

- The database write might fail.
- The user might not be found after creation because of an unexpected issue.
- `500` means the server failed while processing a valid-looking request.

### 15. Returning the successful response

The controller returns:

```js
return res.status(201).json(
  new ApiResponse(200, createdUser, "user registered successfully")
);
```

Reason:

- `res.status(201)` sets the HTTP status code.
- `201` means a new resource was created.
- `.json()` sends a JSON response.
- `ApiResponse` keeps the response structure consistent.
- `createdUser` is sent as the response data.

Expected successful response shape:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "mongodb-user-id",
    "username": "sharv",
    "email": "sharv@example.com",
    "fullName": "Sharv",
    "avatar": "https://res.cloudinary.com/...",
    "coverImage": ""
  },
  "message": "user registered successfully",
  "success": true
}
```

Important implementation note:

- The HTTP response status is currently `201`, but `ApiResponse` is created with `200`.
- For consistency, this should usually be `new ApiResponse(201, createdUser, "user registered successfully")`.

### 16. Successful registration flow

This is the intended successful user registration flow:

```txt
Client sends POST /api/v1/users/register
        |
        v
Request uses multipart/form-data
        |
        v
app.js forwards /api/v1/users request to userRouter
        |
        v
user.routes.js matches POST /register
        |
        v
Multer upload.fields() reads avatar and coverImage files
        |
        v
Multer stores files temporarily in public/temp
        |
        v
registerUser controller starts
        |
        v
Controller reads username, email, fullName, password from req.body
        |
        v
Controller validates required fields
        |
        v
Controller checks MongoDB for existing username or email
        |
        v
Controller reads avatar and cover image paths from req.files
        |
        v
Controller uploads avatar to Cloudinary
        |
        v
Controller uploads optional cover image to Cloudinary
        |
        v
Controller creates user with User.create()
        |
        v
User model pre-save hook hashes password with bcrypt
        |
        v
MongoDB saves the new user
        |
        v
Controller fetches created user without password and refreshToken
        |
        v
Controller returns 201 response with ApiResponse
```

Successful result:

- User is saved in MongoDB.
- Password is stored as a bcrypt hash.
- Avatar URL is saved from Cloudinary.
- Cover image URL is saved if uploaded.
- Response does not expose password or refresh token.

### 17. Unsuccessful registration flows

Registration can fail at multiple points. Each failure should stop the flow and return a clear error.

#### Missing required text fields

Flow:

```txt
Client sends request
        |
        v
Controller reads req.body
        |
        v
One of fullName, email, username, or password is empty
        |
        v
Controller throws ApiError(400)
        |
        v
User is not created
```

Reason:

- The request is invalid because required user data is missing.
- `400 Bad Request` is the correct type of error for invalid input.

#### Username or email already exists

Flow:

```txt
Client sends request
        |
        v
Controller validates required fields
        |
        v
Controller searches User collection with $or
        |
        v
Existing username or email is found
        |
        v
Controller throws ApiError(409)
        |
        v
User is not created
```

Reason:

- Duplicate users should not be created.
- `409 Conflict` is used because the new request conflicts with existing data.

#### Avatar file is missing

Flow:

```txt
Client sends request without avatar
        |
        v
Multer does not provide req.files.avatar
        |
        v
Controller cannot find avatarLocalPath
        |
        v
Controller throws ApiError(400)
        |
        v
User is not created
```

Reason:

- The user schema requires an avatar.
- Registration should stop before database creation.

#### Cloudinary avatar upload fails

Flow:

```txt
Client sends avatar
        |
        v
Multer saves avatar locally
        |
        v
Controller calls uploadOnCloudinary()
        |
        v
Cloudinary upload fails or returns null
        |
        v
Controller throws ApiError(400)
        |
        v
User is not created
```

Reason:

- The backend needs a valid hosted image URL before creating the user.
- Local temp files are not the final storage location.

#### MongoDB user creation fails

Flow:

```txt
Request passes validation
        |
        v
Images upload successfully
        |
        v
Controller calls User.create()
        |
        v
Database save fails or created user cannot be fetched
        |
        v
Controller throws ApiError(500)
        |
        v
Client receives server error
```

Reason:

- At this point the request looked valid, but the backend failed internally.
- `500 Internal Server Error` communicates that the server could not complete the operation.

### 18. Methods and library functions used in this phase

#### `upload.fields()`

Comes from:

```js
multer
```

Purpose:

- Reads multiple named file fields from a `multipart/form-data` request.
- Saves uploaded files locally using the configured Multer storage.
- Adds file metadata to `req.files`.

#### `cloudinary.uploader.upload()`

Comes from:

```js
cloudinary
```

Purpose:

- Uploads a local file to Cloudinary.
- Returns a response object containing the hosted file URL and metadata.
- Allows the backend to save a media URL in MongoDB instead of saving raw files.

#### `User.findOne()`

Comes from:

```js
mongoose
```

Purpose:

- Searches the users collection for the first document matching the query.
- Used here to prevent duplicate username or email registration.

#### `$or`

Comes from:

```txt
MongoDB query operators
```

Purpose:

- Allows more than one possible match condition.
- Used here to check `username` OR `email`.

#### `User.create()`

Comes from:

```js
mongoose
```

Purpose:

- Creates a new user document.
- Runs Mongoose validation.
- Triggers the `pre("save")` password hashing middleware.
- Saves the document in MongoDB.

#### `User.findById()`

Comes from:

```js
mongoose
```

Purpose:

- Finds a user by MongoDB `_id`.
- Used after creation to fetch the saved user.

#### `.select()`

Comes from:

```js
mongoose
```

Purpose:

- Controls which fields are included or excluded in the query result.
- Used here to remove `password` and `refreshToken` from the response.

#### `bcrypt.hash()`

Comes from:

```js
bcrypt
```

Purpose:

- Converts the plain password into a secure hash before storing it.
- Protects users if the database is ever exposed.

#### `res.status().json()`

Comes from:

```js
express
```

Purpose:

- `res.status(code)` sets the HTTP status code.
- `.json(data)` sends a JSON response to the client.
- Chaining them keeps response code and response body together.

#### `ApiError`

Comes from:

```txt
src/utils/ApiError.js
```

Purpose:

- Gives errors a consistent shape.
- Stores `statusCode`, `message`, `success: false`, and optional error details.
- Makes controller failures easier to handle in one central error middleware later.

#### `ApiResponse`

Comes from:

```txt
src/utils/ApiResponse.js
```

Purpose:

- Gives successful responses a consistent shape.
- Stores `statusCode`, `data`, `message`, and `success`.
- Makes frontend response handling more predictable.

#### `asyncHandler`

Comes from:

```txt
src/utils/asyncHandler.js
```

Purpose:

- Wraps async controllers.
- Converts rejected promises into Express errors through `next(error)`.
- Avoids writing `try...catch` inside every controller.

### 19. Advanced syntax recap

#### Destructuring

```js
const { username, email } = req.body;
```

Meaning:

- Pull `username` and `email` properties out of `req.body`.

#### Optional chaining

```js
coverImage?.url
```

Meaning:

- If `coverImage` exists, read `coverImage.url`.
- If `coverImage` is missing, return `undefined` instead of crashing.

#### Optional array access

```js
req.files?.avatar?.[0]?.path
```

Meaning:

- Safely read the first avatar file path only if each previous part exists.

#### Array `.some()`

```js
[fullName, email, username, password].some((field) => field?.trim() === "")
```

Meaning:

- Return `true` if at least one field is empty after trimming spaces.

#### Arrow function

```js
(field) => field?.trim() === ""
```

Meaning:

- A short function that receives `field` and returns whether it is empty.

#### Logical OR fallback

```js
coverImage?.url || ""
```

Meaning:

- Use `coverImage.url` if it exists.
- Otherwise use an empty string.

#### Method chaining

```js
res.status(201).json(...)
```

Meaning:

- Call `status()` first.
- Then call `json()` on the same response object.

#### Mongoose query chaining

```js
User.findById(user._id).select("-password -refreshToken");
```

Meaning:

- Build a query that finds by ID.
- Modify that query to exclude sensitive fields.
- `await` runs the query and returns the result.

### 20. Important corrections before testing this phase

The current registration logic is close, but these details should be corrected for the endpoint to work reliably:

```js
const existedUser = await User.findOne({
  $or: [{ username }, { email }],
});
```

Reason:

- `await` is needed to get the actual database result.
- `usernme` should be corrected to `username`.

Use safer file path access:

```js
const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
```

Reason:

- This prevents crashes when optional file fields are missing.

Use matching response status codes:

```js
return res
  .status(201)
  .json(new ApiResponse(201, createdUser, "user registered successfully"));
```

Reason:

- The HTTP status and response body's `statusCode` should describe the same result.

Prefer Cloudinary secure URLs:

```js
avatar: avatar.secure_url,
coverImage: coverImage?.secure_url || "",
```

Reason:

- `secure_url` uses HTTPS.

Also check the Cloudinary environment variable name in `cloudinary.js`:

```js
api_secret: process.env.CLOUDINARY_API_SECRET
```

Reason:

- `CLOUDINARY_APT_SECRET` looks like a spelling mistake.
- The code and `.env` key must match exactly.

### 21. Phase Six result

At the end of Phase Six, the backend has the intended complete user registration pipeline:

- The user route accepts text fields and image files.
- Multer stores uploaded files temporarily.
- The controller validates required fields.
- The controller checks for duplicate username or email.
- The controller requires an avatar.
- Files are uploaded to Cloudinary.
- User data is saved in MongoDB.
- The user model hashes the password before saving.
- Sensitive fields are excluded from the response.
- Successful responses use `ApiResponse`.
- Failed flows use `ApiError`.

## Current Status

Phase One, Phase Two, Phase Three, Phase Four, Phase Five, and Phase Six are documented. The project now has a production-style folder structure, MongoDB connection setup, Express app configuration, reusable API utilities, authentication helper methods, initial User and Video models, Multer file upload middleware, Cloudinary media upload support, a mounted user router, and an intended full user registration controller.

Before testing successful registration, apply the corrections listed in Phase Six section 20 so duplicate-user checking, file access, response status codes, and Cloudinary secret configuration work correctly.
