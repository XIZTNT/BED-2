

//FS functionality
import 'fs';
import 'path';

// Data we are interacting with
import '../agents.js'

//Model we are interacting with in Mongo
import '../agent.schema.js'
import { fstat } from 'fs';

//AGENT CREATE FUNCTION

const agentcreate = async (req, res) => {

    try {
      console.log(req.body);
      //can also use "res.json(req.body)"
      const NewAgent = await AgentSchema.create(req.body);
      res.status(201).json({ message: "Agent created successfully", data: NewAgent });
    } catch (error) {
      console.error('Failed to create agent', error);
      res.status(404).json({ message: "Failed to create agent", error: error.message });
    }
  };
  
  //AGENTS SORT BY LAST NAME FUNCTION 

  //Return all agents by last name alphabetically ENDPOINT
  //Will want to stick with sort function in order to compare values that come before or after
  //read datafile as a datafile (use or lookup "fs" read file)
  // fs.readFile("agents.js","utf8", (err,content) => {
  //   console.log(content);
  // });
//COMMENTED OUT DUE TO ES6 CHANGE

  //checjk if im geting through emit
  const agents = async (req, res) => {
  try {
    //datafile alone wasn't enough to make app.js run this function, I needed the ".Jsagents" portion
  const lastnames = datafile.jsagents
  .sort((a, b) => a.last_name.localeCompare(b.last_name))
  //"agent" here serves as a placeholder to interact with the specific object
  .map(agent => agent.last_name);
  
  res.status(201).json({ message: "Sorted lastnames completed", data: lastnames });
  
  } catch (error) {
    console.error("Error organizing last names:",error.message);
    res.status(404).json({ message:"Failed to organize last names sort", error: error.message });
  }
  };
  
  //AGENTS BY REGION FUNCTION
  
  const agentsbyregion = (req,res) => {
  try {
  //I NEED A VALUE PAIR, I NEED REGION:REGION, AGENTRATING:COLON
  //LEFT HAND SIDE IS SHOWN CAN BE CALLED ANYTHING YOU WANT
  //CONSTANTS CAN BE CAPITALIZED, SHOWING EITHER A STRING, OR A NUMBER 
  const regionAgents = datafile.jsagents.sort((a,b) => a.region.localeCompare(b.region))
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

  //CHATGPT
  // const agentsbyregion = (req, res) => {
  //   try {
      
  //     const regionAgents = datafile.jsagents.sort((a, b) =>
  //       a.region.localeCompare(b.region)
  //     );
  
  //     // Optional: group or log nicely
  //     regionAgents.forEach(agent => {
  //       console.log(`Region: ${agent.region} | Agent Rating: ${agent.rating}`);
  //     });
  
  //     res.status(200).json({
  //       message: "Successfully sorted agents by region",
  //       data: regionAgents
  //     });
  
  //   } catch (error) {
  //     console.error("Error returning ratings based on query parameter:", error.message);
  //     res.status(500).json({
  //       message: "Failed to organize queried ratings sort",
  //       error: error.message
  //     });
  //   }
  // };
  
  
  //Agent Update Info FUNCTION
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
  
  // AGENT DELETE FUNCTION
  
  
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



  //CHATGPT says agent delete "technically" doesn't delete anything from the array data

  
  
  //EXPORTING SO THAT CONTROLLER FUNCTIONS CAN BE USED IN ROUTES

  export default { agentcreate, agents, agentsbyregion, agentupdateinfo, agentdelete

  };