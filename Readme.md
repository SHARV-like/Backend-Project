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
- Before using `uploadOnCloudinary()` inside controllers, export it from `src/utils/cloudinary.js`.

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

## Current Status

Phase One, Phase Two, Phase Three, and Phase Four are complete. The project now has a production-style folder structure, MongoDB connection setup, Express app configuration, reusable API utilities, authentication helper methods, initial User and Video models, Multer file upload middleware, and Cloudinary media upload support.

The next phase can focus on controllers, routes, centralized error handling, authentication middleware, user registration, login, logout, token refresh, and connecting uploaded Cloudinary assets with MongoDB documents.
