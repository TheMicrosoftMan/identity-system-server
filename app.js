const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/api/analis", require("./api/analis"));
app.use("/api/datasets", require("./api/datasets"));

app.listen(process.env.PORT, () => {
  console.log("Server is working");
});
