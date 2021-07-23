const axios = require("axios")
const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const { response } = require("express")
const port = 3000

const app = express()

app.use(express.static("public"))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Index.html")
})

app.post("/", function (req, res) {
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email = req.body.email

  var data = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }
  var jsonData = JSON.stringify(data)

  console.log(jsonData)

  async function makeGetRequest() {
    let profile = jsonData
    let res = await axios.post("https://api.cmtelecom.com/events/v1.0/tenants/cf9775a5-481e-46aa-8dfe-a81b041290e3/events/aa17aa39-28b8-4c69-8ed5-8fa97c295b66", profile, { headers: { "X-CM-PRODUCTTOKEN": "5844b96f-6a0d-436a-bb50-96458359d02b", "Content-Type": "application/json" } })
  }
  makeGetRequest()

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else res.sendFile(__dirname + "/failure.html")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
})
