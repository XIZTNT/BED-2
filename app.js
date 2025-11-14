//How to access agents.js within app.js? (line 1)
// import AgentSchema from "./agent.schema.js"
//Region Scheme Import
// import RegionSchema from "./region.schema.js"
import datafile from "./agents.js"
import dotenv from 'dotenv'
//FS functionality
import fs from 'fs';
// import path from 'path';
dotenv.config()
//Express Middleware
import express from 'express';
const app = express();
app.use(express.json());
//Added in to make sure parsing is a non-issue with Postman Requests
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.json()), no need to use
const port = process.env.PORT || 5050
const env = process.env.ENV || ""
//MIDDLEWARE IMPORT FOR AUTHENTICATION ON ROCKET ELEVATORS ROUTES
import baseMiddleware from './src/shared/middleware/baseMiddleware.js'

//Mongo Manager Open Connection
import { openMongoConnection } from './src/shared/db/mongo-manager.js';
openMongoConnection();
app.listen(port, () => {
  //app.get(do more research to setup api endpoint and call function)
  console.log(` server listening on port ${port} `)
})

//BED-1 ROUTES:

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

//Route Calling Function

//
//if the routers are are separated into 
const RouteCaller = (app) => {
  app.get("/hello",hello)
  app.get("/status",status)
  app.get("/error",error)
  //These Routes require authentication
  app.get("/email-list",baseMiddleware,getEmailList)
  app.post("/contact-us",baseMiddleware,contactus) 
  //BED 2 Section Endpoints, NOW IN "AgentController" and "RegionsController"
  }
  RouteCaller(app)

//BED 2 Region Section Endpoints

// app.get("/agents",agents)

//NEW AGENT ROUTES
import AgentRouteEndPoints from './src/Routes/AgentRoutes.js'
//NEW REGION ROUTES
import RegionRouteEndPoints from './src/Routes/RegionRoutes.js'
// AgentRouteEndPoints, will need to change for these imports later

//MIDDLEWARE ROUTE FOR AUTHENTICATION - NOT NECESSARY DUE TO TIES TO REGION ROUTES
// import authMiddleware from './shared/middleware/baseMiddleware.js';
//const RoutesforRegion = require ('./RegionRoutes')
//NEW "get" USAGE for postman
//This tells me that I'm using my routes that is connected to the controller file, 
//while using the specific route, in this case agent create, within the "AgentRoutes file"
//AGENT CALLBACK ROUTES FOR POSTMAN
app.use("/agent", AgentRouteEndPoints);
//
app.use("/region", RegionRouteEndPoints);


//Comments/NOTES

//Field Value Pairs for Mongo
// {name: James,
// height: Tall,
//

//Below: IN relation to creating original Agent Routes
//Install Package Manager Tomorrow

//I WILL NEED TO IMPORT MY CONTROLLER JS FILE
// const agentController = require('./controller.js');

//MVC = THINK OF THE CONTROLLER LIKE A CAR, (ITS WHAT GETS YOU THERE), and the ROUTE IS THE ROAD, THE ROUTE IS THE PURPOSE TO COMMMUNICATE WHAT IS IN THE CONTROLLER TO APP JSS, ROUTES PASS THE INFO FROM CONTROLLERS TO EXPRESS IN WHICH PASSES
//if theres an issue its issolated, , and you know where everything is...

//Region Create Route

//add controllers, look @ docebo for file tree, I am sorting through mongoose data rather than "adding agents"

//jsagent.map needs to map something specific
//you have to tell .join what to join
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)
//You should use the "jsagents" for this section


//agents.json included in FSD folder

//for email list^ (the list is structured as an Array of Objects)
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)


// // My AgentCreate Route:

// const agentcreate = async(req, res) => {
//     // Create the agent using data from the request body
    
//     const agent = await AgentSchema.create(req.body);
    
// if (agent) {
//     // Log and respond with the created agent
//     console.log('Agent created:', agent);
//     res.status(201).json({ message: "Agent created successfully", data: agent });
// } else if (!agent){

//     console.error('Agent creation failed', error);
//     res.status(404).send({ message: "Agent creation failed", error: message });
// }
// }
//   agentcreate();

  
//Next agents requirement
  // async function agents(req, res) {
  //   try {
  //     // Query all agents and sort them by 'last_name' alphabetically
  //     const agents = await AgentSchema.find().sort({ last_name: 1 }); // 1 for ascending order
  
  //     // Respond with the list of agents
  //     res.status(200).json({ message: "Agents retrieved successfully", data: agents });
  //   } catch (error) {
  //     console.error('Failed to retrieve agents', error);
  //     res.status(500).json({ message: "Failed to retrieve agents", error: error.message });
  //   }
  // }
  // agents();


//"Confirmations" will be status error codes 


