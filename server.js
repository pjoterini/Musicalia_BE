require("dotenv").config();

var util = require("util");
var encoder = new util.TextEncoder("utf-8");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Mongoose"));

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/artists", require("./routes/artists"));
app.use("/songs", require("./routes/songs"));

app.get("/test", async (req, res) => {
  const data = await db.collection("artists").find().toArray();
  console.log(data);
  res.send("sup");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("http://localhost:3000")
);
