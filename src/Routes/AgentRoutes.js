import express from 'express';
const router = express.Router();
//IMPORT AGENT CONTROLLER
import AgentController from '../controllers/AgentController.js'

//"baseMiddleware can be added for authentication purposes (",baseMiddleware,")

router.post("/agent-create",AgentController.agentcreate);

router.get("/agents",AgentController.agents);

router.get("/agents-by-region",AgentController.agentsbyregion);

router.patch("/agent-update-info",AgentController.agentupdateinfo);

router.delete("/agent-delete",AgentController.agentdelete);

export default router;
  