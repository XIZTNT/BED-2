import express from 'express';
//my model OR IMPORT AGENTS.JS
// import Agents = require ('./agents')
// const AgentSchema = require('./agent.schema'); -- NOT SURE IF NEEDED AT THIS POINT
const router = express.Router();
//IMPORT AGENT CONTROLLER
import './AgentController'
const AgentRouteEndPoints = (app) => {

router.post("/agentcreate",AgentController.agentcreate);
router.get("/agents",AgentController.agents);
router.get("/agentsbyregion",AgentController.agentsbyregion);
router.patch("/agentupdateinfo",AgentController.agentupdateinfo);
router.delete("/agentdelete",AgentController.agentdelete);
}

//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT
export default {AgentRouteEndPoints};
  