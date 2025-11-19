

//FS functionality
import 'fs';
import 'path';

//Model we are interacting with in Mongo
import AgentSchema from '../shared/db/schemas.js/agent.schema.js'

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


//GET AGENTS ENDPOINT
  //checjk if im geting through emit
  const agents = async (req, res) => {
    try {
      const sortedAgents = await AgentSchema.find()
        .sort({ last_name: 1 }); // 1 = ASC (A → Z)
  
      res.status(200).json({
        message: "Agents sorted by last name",
        data: sortedAgents
      });
  
    } catch (error) {
      console.error("Error sorting agents:", error);
      res.status(500).json({
        message: "Failed to sort agents",
        error: error.message
      });
    }
  };  
  
  //AGENTS BY REGION FUNCTION
  
  // -----------------------------
// Get agents by region (required query parameter 'region')
//EXAMPLE URL: http://localhost:3000/agent/agents-by-region?region=north
// Sorted by rating (highest to lowest)
// -----------------------------
const agentsbyregion = async (req, res) => {
  try {
    const region = req.query.region;

    if (!region) {
      return res.status(400).json({
        message: "Query parameter 'region' is required"
      });
    }

    // Case-insensitive region query using RegExp
    const filteredAgents = await AgentSchema.find({
      region: new RegExp(`^${region}$`, "i")   // ← MATCHES (with RegExp) 'East', 'east', 'EAST', etc.
    }).sort({ rating: -1 });

    res.status(200).json({
      message: `Agents in region '${region}' sorted by rating`,
      data: filteredAgents
    });

  } catch (error) {
    console.error("Error fetching agents by region:", error);
    res.status(500).json({
      message: "Failed to fetch agents by region",
      error: error.message
    });
  }
};

  
  //Agent Update Info FUNCTION
  const agentupdateinfo = async (req, res) => {
    try {
      const { current_email } = req.body;
  
      if (!current_email) {
        return res.status(400).json({ message: "Current email is required to identify the agent" });
      }
  
      // Whitelist of fields allowed to be updated
      const allowedUpdates = ['first_name', 'last_name', 'email', 'region'];
      const updates = {};
  
      allowedUpdates.forEach(field => {
        if (req.body[field] !== undefined && field !== 'current_email') {
          updates[field] = req.body[field];
        }
      });
  
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update" });
      }
  
      // Case-insensitive find by current_email
      const updatedAgent = await AgentSchema.findOneAndUpdate(
        { email: new RegExp(`^${current_email}$`, "i") },
        updates,
        { new: true }
      );
  
      if (!updatedAgent) {
        return res.status(404).json({ message: "Agent not found. Cannot update non-existent agent." });
      }
  
      res.status(200).json({
        message: "Agent updated successfully",
        data: updatedAgent
      });
  
    } catch (error) {
      console.error("Error updating agent:", error);
      res.status(500).json({
        message: "Failed to update agent",
        error: error.message
      });
    }
  };
  
  
  
  // AGENT DELETE FUNCTION
  const agentdelete = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required to delete an agent" });
      }
  
      // Case-insensitive find and delete
      const deletedAgent = await AgentSchema.findOneAndDelete({
        email: new RegExp(`^${email}$`, "i")
      });
  
      if (!deletedAgent) {
        return res.status(404).json({ message: "Agent not found. Cannot delete non-existent agent." });
      }
  
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
      console.error("Error deleting agent:", error);
      res.status(500).json({ message: "Failed to delete agent", error: error.message });
    }
  };
  



  //CHATGPT says agent delete "technically" doesn't delete anything from the array data

  
  
  //EXPORTING SO THAT CONTROLLER FUNCTIONS CAN BE USED IN ROUTES

  export default { agentcreate, agents, agentsbyregion, agentupdateinfo, agentdelete};