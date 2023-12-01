const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");

const { isAuthenticated } = require("./middleware/jwt.middleware");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors({ origin: ["http://localhost:5005/"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/api", isAuthenticated, require("./routes/cohort.routes"));
app.use("/api", isAuthenticated, require("./routes/student.routes"));
app.use("/api", isAuthenticated, require("./routes/user.routes"));

app.use("/auth", require("./routes/auth.routes"))

const { errorHandler, notFoundHandler } = require("./middleware/error-handling")

app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
