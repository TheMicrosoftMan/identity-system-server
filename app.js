const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/analis", require("./api/analis"));

app.listen(3055, () => {
  console.log("Server is working");
});
