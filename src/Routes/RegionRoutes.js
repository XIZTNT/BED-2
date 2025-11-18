import express from 'express';
//my model OR IMPORT AGENTS.JS
import '../shared/db/schemas.js/region.schema.js'
// const AgentSchema = require('./agent.schema'); -- NOT SURE IF NEEDED AT THIS POINT
const router = express.Router();
import RegionsController from '../controllers/RegionsController.mjs'
import baseMiddleware from '../shared/middleware/baseMiddleware.js'


//REGION ROUTES

router.post("/regioncreate",baseMiddleware,RegionsController.regioncreate);

router.get("/getregion",baseMiddleware,RegionsController.getregion);

//if this is technically less sensitive data, you can remove the "baseMiddlware"
//to make this information more accesible
router.get("/allstars",RegionsController.allstars);


//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT

export default router;

