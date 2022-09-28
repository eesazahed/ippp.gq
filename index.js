require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || null
  );
});

app.get("/:ipAddress", async (req, res) => {
  try {
    const response = await axios.get(
      `https://ipapi.co/${req.params.ipAddress}/json/`
    );

    const request = await axios.get(
      `http://api.positionstack.com/v1/reverse?access_key=${process.env["POSITIONSTACK_API_KEY"]}&query=${response.data.latitude},${response.data.longitude}`
    );

    let address = request.data.data[0];

    res.render("index", {
      success: true,
      ip: response.data.ip,
      name: address.name,
      country: address.country,
      region: address.region,
      city: response.data.city,
      postal_code: address.postal_code,
      timezone: response.data.timezone,
      org: response.data.org,
      asn: response.data.asn,
    });
  } catch {
    res.render("index", {
      success: false,
    });
  }
});

app.listen(8080, () => {
  console.log(
    "IPPP Online!\n\nView it local: http://localhost:8080\nView it live: https://ippp.gq"
  );
});
