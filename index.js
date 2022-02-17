const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//comment for test
//hey
