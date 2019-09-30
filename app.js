const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/api/analis", require("./api/analis"));
app.use("/api/datasets", require("./api/datasets"));

app.listen(3055, () => {
  console.log("Server is working");
});
