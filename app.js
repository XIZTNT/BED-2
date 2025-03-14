//How to access agents.js within app.js? (line 1)
const datafile = require("./agents.js")
const AgentSchema = require("./agent.schema.js")
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 5050
const env = process.env.ENV || ""

//Mongo Manager Open Connection
const MongoManager = require('./mongo-manager')
MongoManager.openMongoConnection();
app.listen(port, () => {
  //app.get(do more research to setup api endpoint and call function)
  console.log(` server listening on port ${port} `)
})

//Mongo Manager
const MongoDBFile = require("./mongo-manager.js")


//Field Value Pairs for Mongo
// {name: James,
// height: Tall,
// }

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
res.send(email);
}

//Contact US Endpoint
const contactus = async (req,res) => {
//asyn to wait so it can fulfill apromise

const first_name = req.body.first_name
const last_name = req.body.last_name
const message = req.body.message

res.send(`Thank you for contacting us ${first_name}${last_name}, we will contact you shortly!`)
console.log(message);
}

//Agent Create Endpoint

//Agent Schema Definition:
const AgentCreateSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    region: String,
});

const agentcreate = async () => {
}


//"Confirmations" will be status error codes 


//Route Calling Function

//

const RouteCaller = (app) => {
app.get("/hello",hello)
app.get("/status",status)
app.get("/error",error)
app.get("/email-list",getEmailList)
app.post("/contact-us",contactus)   
app.post("/agent-create",agentcreate)
app.get("/agent-create",agents)
app.get("/agents-by-region"),agentsbyregion)
app.put("/agent-update-info",agentupdateinfo)
app.delete("/agent-delete",agentdelete)
}
RouteCaller(app)



//Comments/NOTES
//jsagent.map needs to map something specific
//you have to tell .join what to join
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)
//You should use the "jsagents" for this section



//agents.json included in FSD folder

//for email list^ (the list is structured as an Array of Objects)
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)
