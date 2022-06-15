const express = require("express");
const axios = require("axios");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(req.header("x-forwarded-for") || req.connection.remoteAddress);
});

app.get("/:ipAddress", async (req, res) => {
  const response = await axios.get(`http://ip-api.com/json/${req.params.ipAddress}`);
  console.log(response.data)
  res.render("index", response.data);
});

app.listen(8080, () => {
  console.log("IPPP Online!\nhttp://localhost:8080\nhttps://ippp.gq")
});
