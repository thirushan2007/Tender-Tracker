const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const tenderRoutes = require("./routes/tenderRoutes");

app.use("/api", tenderRoutes);

module.exports = app;