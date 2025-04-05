// const express=require('express');
// const Agent=require('./agent.schema');
// const router=express.Router();

// //Agent Create Endpoint



// // //CHAT GPT VERSION OF AGENT CREATE ENDPOINT
// // const agentcreate = async (req, res) => {
// //   try {
// //     // Create the agent using data from the request body
// //     const agent = await AgentSchema.create(req.body);

// //     // Check if the agent was created successfully
// //     if (agent) {
// //       // Log and respond with the created agent
// //       console.log('Agent created:', agent);
// //       res.status(201).json({ message: "Agent created successfully", data: agent });
// //     } else {
// //       // Handle the case where the agent creation fails
// //       console.error('Agent creation failed');
// //       res.status(400).send({ message: "Agent creation failed" });
// //     }

// //   } catch (error) {
// //     // Catch any errors that happen during the process
// //     console.error('Error creating agent:', error);
// //     res.status(500).send({ message: "Error creating agent", error: error.message });
// //   }
// // };

// //Install Package Manager Tomorrow

// //CHATGPT v2 Attempt:


// router.post ('/agent-create',async(req, res) => {
//     try {
//       console.log(req.body);
//       const NewAgent = await Agent.create(req.body);
//       res.status(201).json({ message: "Agent created successfully", data: NewAgent });
//     } catch (error) {
//       console.error('Failed to create agent', error);
//       res.status(404).json({ message: "Failed to create agent", error: error.message });
//     }
//   };
  
  
  
  
//   // // My AgentCreate Route:
  
//   // const agentcreate = async(req, res) => {
//   //     // Create the agent using data from the request body
      
//   //     const agent = await AgentSchema.create(req.body);
      
//   // if (agent) {
//   //     // Log and respond with the created agent
//   //     console.log('Agent created:', agent);
//   //     res.status(201).json({ message: "Agent created successfully", data: agent });
//   // } else if (!agent){
  
//   //     console.error('Agent creation failed', error);
//   //     res.status(404).send({ message: "Agent creation failed", error: message });
//   // }
//   // }
//   //   agentcreate();
  
    
//   //Next agents requirement
//     // async function agents(req, res) {
//     //   try {
//     //     // Query all agents and sort them by 'last_name' alphabetically
//     //     const agents = await AgentSchema.find().sort({ last_name: 1 }); // 1 for ascending order
    
//     //     // Respond with the list of agents
//     //     res.status(200).json({ message: "Agents retrieved successfully", data: agents });
//     //   } catch (error) {
//     //     console.error('Failed to retrieve agents', error);
//     //     res.status(500).json({ message: "Failed to retrieve agents", error: error.message });
//     //   }
//     // }
//     // agents();
  
  
//   //"Confirmations" will be status error codes 
  
  
//   //Route Calling Function
  
//   //
  
//   const RouteCaller = (router) => {
//   //BED 2 Section Endpoints
//   router.post("/agent-create",agentcreate)
  
//   // app.get("/agents",agents)
  
//   }

//   const agentcreate = async (req, res) => {

//     try {
//       console.log(req.body);
//       const NewAgent = await Agent.create(req.body);
//       res.status(201).json({ message: "Agent created successfully", data: NewAgent });
//     } catch (error) {
//       console.error('Failed to create agent', error);
//       res.status(404).json({ message: "Failed to create agent", error: error.message });
//     }
//   };

//   module.exports = router;
  