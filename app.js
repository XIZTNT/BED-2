//How to access agents.js within app.js? (line 1)
const datafile = require("./agents.js")
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 5050
const env = process.env.ENV || ""
app.listen(port, () => {
  //app.get(do more research to setup api endpoint and call function)
  console.log(` server listening on port ${port} `)
})


//ROUTES!!!

//Hello Route
const hello = (req,res) => {
console.log(`server running on port ${port}`)
res.send("Hello World")
}

//Status Route

const status = (req,res) => {
console.log(`server running on port ${port}`)
res.send(`server running on port ${port} and in the ${env} environment`)
}


//Error Route
const error = (req,res) => {
const StatusCode = 404
res.status(StatusCode).send(`Sorry agent not found ${StatusCode}`)
}


//Email List Route

const getEmailList = (req,res) => {
let email = datafile.jsagents.map(list => list.email).join(",")
gi
res.send(email);
}

//
const contactus = async (req,res) => {
//asyn to wait so it can fulfill apromise

const first_name = req.body.first_name
const last_name = req.body.last_name
const message = req.body.message

res.send(`Thank you for contacting us ${first_name}${last_name}, we will contact you shortly!`)
console.log(message);
}


//Comments
//jsagent.map needs to map something specific
//you have to tell .join what to join
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)
//You should use the "jsagents" for this section



//agents.json included in FSD folder

//for email list^ (the list is structured as an Array of Objects)
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)

//Route Calling Function

const RouteCaller = (app) => {
app.get("/hello",hello)
app.get("/status",status)
app.get("/error",error)
app.get("/email-list",getEmailList)
app.post("/contact-us",contactus)   
}
RouteCaller(app)
