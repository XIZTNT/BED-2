

//FS functionality
import 'fs';
import 'path';

// Data we are interacting with
import datafile from '../agents.js'

//Model we are interacting with in Mongo
import AgentSchema from '../src/shared/db/schemas.js/agent.schema.js';

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
  
  // -----------------------------
// Get agents by region (required query parameter 'region')
//EXAMPLE URL: http://localhost:3000/agent/agents-by-region?region=north
// Sorted by rating (highest to lowest)
// -----------------------------
const agentsbyregion = (req, res) => {
  try {
    const region = req.query.region;

    // Enforce required query param
    if (!region) {
      return res.status(400).json({ message: "Query parameter 'region' is required" });
    }

    // Filter agents by region
    let filteredAgents = datafile.jsagents.filter(
      agent => agent.region.toLowerCase() === region.toLowerCase()
    );

    // Sort by rating (descending)
    filteredAgents.sort((a, b) => Number(b.rating) - Number(a.rating));

    res.status(200).json({
      message: `Agents in region '${region}' sorted by rating`,
      data: filteredAgents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch agents by region", error: error.message });
  }
};

  
  //Agent Update Info FUNCTION
  const agentupdateinfo = (req, res) => {
    try {
      const { email, first_name, last_name, region } = req.body;
  
      // Find the agent by unique identifier (email)
      const agent = datafile.jsagents.find(a => a.email === email);
  
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      // Only update allowed fields
      if (first_name) agent.first_name = first_name;
      if (last_name) agent.last_name = last_name;
      if (region) agent.region = region;
  
      res.status(200).json({
        message: "Agent updated successfully",
        data: {
          first_name: agent.first_name,
          last_name: agent.last_name,
          email: agent.email,
          region: agent.region
        }
      });
  
    } catch (error) {
      console.error("Error updating agent info:", error.message);
      res.status(500).json({ message: "Failed to update agent info", error: error.message });
    }
  };
  
  // AGENT DELETE FUNCTION
  const agentdelete = (req, res) => {
    try {
      const { email } = req.body;  // Only need email for deletion
  
      if (!email) {
        return res.status(400).json({ message: "Email is required to delete an agent" });
      }
  
      const index = datafile.jsagents.findIndex(agent => agent.email === email);
  
      if (index === -1) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      const deletedAgent = datafile.jsagents.splice(index, 1)[0];
  
      res.status(200).json({
        message: "Agent deleted successfully",
        data: {
          first_name: deletedAgent.first_name,
          last_name: deletedAgent.last_name,
          email: deletedAgent.email,
          region: deletedAgent.region
        }
      });
  
    } catch (error) {
      console.error("Error deleting agent:", error.message);
      res.status(500).json({ message: "Failed to delete agent", error: error.message });
    }
  };
  



  //CHATGPT says agent delete "technically" doesn't delete anything from the array data

  
  
  //EXPORTING SO THAT CONTROLLER FUNCTIONS CAN BE USED IN ROUTES

  export default { agentcreate, agents, agentsbyregion, agentupdateinfo, agentdelete};