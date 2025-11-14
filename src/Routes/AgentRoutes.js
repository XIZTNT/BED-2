import express from 'express';
//my model OR IMPORT AGENTS.JS
// import Agents = require ('./agents')
// const AgentSchema = require('./agent.schema'); -- NOT SURE IF NEEDED AT THIS POINT
const router = express.Router();
//IMPORT AGENT CONTROLLER
import AgentController from '../Controllers/AgentController.js'
// const AgentRouteEndPoints = (app) => {

router.post("/agent-create",AgentController.agentcreate);
router.get("/agents",AgentController.agents);
router.get("/agents-by-region",AgentController.agentsbyregion);
router.patch("/agent-update-info",AgentController.agentupdateinfo);
router.delete("/agent-delete",AgentController.agentdelete);
// }

//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT
// export default {AgentRouteEndPoints};

export default router;
  