const express = require("express");
const connectdb = require("./config/db");
const app = express();

//Allow API to accept JSON data
app.use(express.json({ extended: false }));

//connect to DB
connectdb();

//connect to routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
