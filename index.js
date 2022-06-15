const express = require("express");
const axios = require("axios");

require('dotenv').config()

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(req.header("x-forwarded-for") || req.connection.remoteAddress);
});

app.get("/:ipAddress", async (req, res) => {
  const response = await axios.get(`http://ip-api.com/json/${req.params.ipAddress}`);

  let address;
  try {
    request = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env["POSITIONSTACK_API_KEY"]}&query=${response.data.lat},${response.data.lon}`)
    address = request.data
  } catch {}

  res.render("index", {...response.data, ...address});
});

app.listen(8080, () => {
  console.log("IPPP Online!\nhttp://localhost:8080\nhttps://ippp.gq")
});
