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

//FETCH THEN GET

// Provided URL: http://99.79.77.144:3000/api/agents

// const AgentData = async () => {
//   //INFO REQ
//     const response = await fetch("http://99.79.77.144:3000/api/agents") 
//     const data = await response.json()
//     // conversion to JSON is to return usable data (precautionary)
//     console.log(data) 
//   }
//   AgentData() 
//  LINE 12  MEANS TO CALL THE FUNCTION

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

//Replacer

// const replacer (jsagents)
const emaillist = (req,res) => {
let EmailOBJ = JSON.stringify(jsagents,["email"]);
let FinalOBJEmail = jsagents.map
//GET, I need a get request since I'm getting email
//adding commas, basically taking information out of the json file utilizing the commas
// let FinalOBJEmail = EmailOBJ.map(agent => agent.email);
// res.status(statuscode) ex. 200, 404, etc.
// look up different status codes
// ref: Create, update, delete, read (logic)
//creating a proper try-catch for this API
console.log(EmailOBJ)
}

const getEmailList = (req,res) => {
let email = datafile.jsagents.map(list => list.email).join(",")
gi
res.send(email);
hskjdaskjdsakldskldjajdaksjldkasjda
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
}
RouteCaller(app)
