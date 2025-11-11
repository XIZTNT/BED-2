//How to access agents.js within app.js? (line 1)
// import AgentSchema from "./agent.schema.js"
//Region Scheme Import
// import RegionSchema from "./region.schema.js"
// import jsagents from "./agents.js"
import dotenv from 'dotenv'
//FS functionality
import fs from 'fs';
// import path from 'path';
dotenv.config()
//Express Middlware
import express from 'express';
const app = express();
app.use(express.json());
//Added in to make sure parsing is a non-issue with Postman Requests
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.json()), no need to use
const port = process.env.PORT || 5050
const env = process.env.ENV || ""

//Mongo Manager Open Connection
import { openMongoConnection } from './mongo-manager.js';
openMongoConnection();
app.listen(port, () => {
  //app.get(do more research to setup api endpoint and call function)
  console.log(` server listening on port ${port} `)
})



//Field Value Pairs for Mongo
// {name: James,
// height: Tall,
//

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



// //CHAT GPT VERSION OF AGENT CREATE ENDPOINT
// const agentcreate = async (req, res) => {
//   try {
//     // Create the agent using data from the request body
//     const agent = await AgentSchema.create(req.body);

//     // Check if the agent was created successfully
//     if (agent) {
//       // Log and respond with the created agent
//       console.log('Agent created:', agent);
//       res.status(201).json({ message: "Agent created successfully", data: agent });
//     } else {
//       // Handle the case where the agent creation fails
//       console.error('Agent creation failed');
//       res.status(400).send({ message: "Agent creation failed" });
//     }

//   } catch (error) {
//     // Catch any errors that happen during the process
//     console.error('Error creating agent:', error);
//     res.status(500).send({ message: "Error creating agent", error: error.message });
//   }
// };

//Install Package Manager Tomorrow

// CHATGPT v2 Attempt:

// agent create now moved onto the agent router
const agentcreate = async (req, res) => {

  try {
    console.log(req.body);
    //can also use "res.json(req.body)"
    const NewAgent = await Agent.create(req.body);
    res.status(201).json({ message: "Agent created successfully", data: NewAgent });
  } catch (error) {
    console.error('Failed to create agent', error);
    res.status(404).json({ message: "Failed to create agent", error: error.message });
  }
};

//Return all agents by last name alphabetically ENDPOINT
//Will want to stick with sort function in order to compare values that come before or after
//read datafile as a datafile (use or lookup "fs" read file)
fs.readFile("agents.js","utf8", (err,content) => {
  console.log(content);
});
//checjk if im geting through emit
const agents = async (req, res) => {
try {
  //datafile alone wasn't enough to make app.js run this function, I needed the ".Jsagents" portion
const lastnames = datafile.jsagents
.sort((a, b) => a.last_name.localeCompare(b.last_name))
.map(agent => agent.last_name);

res.status(201).json({ message: "Sorted lastnames completed", data: lastnames });

} catch (error) {
  console.error("Error organizing last names:",error.message);
  res.status(404).json({ message:"Failed to organize last names sort", error: error.message });
}
};


//Agents by Region Route

const agentsbyregion = (req,res) => {
try {
//I NEED A VALUE PAIR, I NEED REGION:REGION, AGENTRATING:COLON
//LEFT HAND SIDE IS SHOWN CAN BE CALLED ANYTHING YOU WANT
//CONSTANTS CAN BE CAPITALIZED, SHOWING EITHER A STRING, OR A NUMBER 
  regionAgents = datafile.jsagents
  .sort((a,b) => a.region.localeCompare(b.region))
  //for loop
  for(item of regionAgents)
    console.log(regionAgents);
  

  //.map(agent => agent.rating);

  res.status(201).json({message:"Successful ratings return by region query", data: regionAgents});

}catch (error) {
  console.error("Error returning ratings based on query parameter",error.message);
    res.status(404).json({message:"Failed to organize queried ratings sort"});
}
};


//Agent Update Route
const agentupdateinfo = (req,res) => {
  try{
//MAP IS FOR ARRAY, USING FIND WILL WORK BETTER FOR OBJECTS!
agentupdate = datafile.jsagents.find(agent => ({
first_name: agent.first_name,
  last_name: agent.last_name,
  email: agent.email,
  region: agent.region,
}));

console.log (agentupdate);
res.status(201).json({message: `Proper requirements established for: ${agentupdate.first_name}, ${agentupdate.last_name}, ${agentupdate.region}, and ${agentupdate.email}`});

}catch (error) {
  console.error("Error in returning required inform ation",error.message);
res.status(404).json("First_Name, Last_Name, Email, and Region do not have proper schematic requirements");
}
};

//Agent Delete Route


const agentdelete = (req,res) => {
  try{
//MAP IS FOR ARRAY, USING FIND WILL WORK BETTER FOR OBJECTS!
agentdeletion = datafile.jsagents.find(agent => ({
first_name: agent.first_name,
  last_name: agent.last_name,
  email: agent.email,
  region: agent.region,
}));

console.log (agentdeletion);
res.status(200).json({message: `Proper deletion for: ${agentdeletion.first_name}, ${agentdeletion.last_name}, ${agentdeletion.region}, and ${agentdeletion.email}`});

}catch (error) {
  console.error("Error in returning required inform ation",error.message);
res.status(404).json("First_Name, Last_Name, Email, and Region have not been properly deleted and return information");
}
};

//I WILL NEED TO IMPORT MY CONTROLLER JS FILE
// const agentController = require('./controller.js');

//MVC = THINK OF THE CONTROLLER LIKE A CAR, (ITS WHAT GETS YOU THERE), and the ROUTE IS THE ROAD, THE ROUTE IS THE PURPOSE TO COMMMUNICATE WHAT IS IN THE CONTROLLER TO APP JSS, ROUTES PASS THE INFO FROM CONTROLLERS TO EXPRESS IN WHICH PASSES
//if theres an issue its issolated, , and you know where everything is...

//Region Create Route

//add controllers, look @ docebo for file tree, I am sorting through mongoose data rather than "adding agents"

const regioncreate = async (req, res) => {


    const {region,address} = req.body;
    console.log(req.body);

    //1st: region n address is req.body, will need sort by a,b, need my schema to find and populate


      //MAPPING HAT WILL BE NECESSARY L8R, REGION AND POSITION, SORT AS
      // 90 OR ABOVE FOR SORT FUNCTION
      // regionAgents = datafile.jsagents.find(regions => ({
      //   North: regions.North,
      //     East: regions.East,
      //     South: regions.South,
      //     West: regions.West,
      //   }));
    //req.body.sort((a,b) => a - b); 
    //region n address is req.body, will need sort by a,b, need my schema to find and populate
    //req.body.sort((a,b) => a - b);
    // i think this is the wrong idea....->const {region, address} = req.body;
    // const agentsInRegion = datafile.jsagents.sort((a,b) => b.sales - a.sales);
    // const TopAgents = datafile.jsagents.sort((a,b) => 

    //here I will need to create an existing region where I find (find 1 method), then use agent schema to create a amanger for those regions, a manager and an agent (with a promise or other method), then I will need a variable for the tops agents and that willl be equal to the sorted agents within the region (will sort these agents by their sales) [a,b and b,a] attached to sales )(a.sales<b.sales) via numerically (sales), then use the schema to create a new region and will have all of these variables created using 
//other variables I will need will be to find the existing region, a manager in the region, agents in the region, top agents, and total sales, and then a new region (the new region wll hold all of these previous mentioned variables)   
    res.status(201).json({ message: "New Region created successfully", data: NewRegionAgent });
};

//Route Calling Function

//
//if the routers are are separated into 
const RouteCaller = (app) => {
app.get("/hello",hello)
app.get("/status",status)
app.get("/error",error)
app.get("/email-list",getEmailList)
app.post("/contact-us",contactus) 
//BED 2 Section Endpoints, NOW IN "AgentController" and "RegionsController"
}
RouteCaller(app)

//BED 2 Region Section Endpoints

// app.get("/agents",agents)

//NEW AGENT ROUTES
import AgentRouteEndPoints from './AgentRoutes.js'
//NEW REGION ROUTES
import RegionRouteEndPoints from './RegionRoutes.js'
// AgentRouteEndPoints, will need to change for these imports later

//const RoutesforRegion = require ('./RegionRoutes')
//NEW "get" USAGE for postman
//This tells me that I'm using my routes that is connected to the controller file, while using the specific route, in this case agent create, within the "AgentRoutes file"
//AGENT CALLBACK ROUTES FOR POSTMAN
app.use("/agent", AgentRouteEndPoints);
//
app.use("/", RegionRouteEndPoints);



//Comments/NOTES
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
