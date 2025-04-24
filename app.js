//How to access agents.js within app.js? (line 1)
const Agent = require("./agent.schema.js")
const datafile = require("./agents.js")
const dotenv = require('dotenv')
//FS functionality
const fs = require('fs');
const path = require('path');
dotenv.config()
//Express Middlware
const express = require('express');
const app = express();
app.use(express.json());
//Added in to make sure parsing is a non-issue with Postman Requests
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.json()), no need to use
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

  try {
  agentdeletion = datafile.jsagents.find(agent => ({



    }


};


//Route Calling Function

//

const RouteCaller = (app) => {
app.get("/hello",hello)
app.get("/status",status)
app.get("/error",error)
app.get("/email-list",getEmailList)
app.post("/contact-us",contactus) 
//BED 2 Section Endpoints
app.post("/agent-create",agentcreate)
app.get("/agents",agents)
app.get("/agents-by-region",agentsbyregion)
app.patch("/agent-update-info",agentupdateinfo)
app.delete("/agent-delete",agentdelete)

// app.get("/agents",agents)

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
