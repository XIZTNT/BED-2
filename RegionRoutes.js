import express from 'express';
//my model OR IMPORT AGENTS.JS
import './region.schema.js'
// const AgentSchema = require('./agent.schema'); -- NOT SURE IF NEEDED AT THIS POINT
const router = express.Router();
import RegionsController from './RegionsController.mjs'


//REGION ROUTES

router.post("/regioncreate",RegionsController.regioncreate);

router.get("/getregion",RegionsController.getregion);

router.get("/allstars",RegionsController.allstars);


//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT

export default router;

