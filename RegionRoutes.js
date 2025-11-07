const express = require('express');
//my model OR IMPORT AGENTS.JS
const RegionSchema = require ('./region.schema')
// const AgentSchema = require('./agent.schema'); -- NOT SURE IF NEEDED AT THIS POINT
const router = express.Router();
const RegionsController = require ('./RegionsController')


//REGION ROUTES

router.post("/regioncreate",RegionsController.regioncreate);

router.get("/getregion",RegionsController.getregions);

router.get("/allstars",RegionsController.allstars);


//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT
module.exports = router;

