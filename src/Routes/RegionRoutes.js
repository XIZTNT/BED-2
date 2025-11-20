import express from 'express';
//import schema to work with MongoDB collection
import '../shared/db/schemas.js/region.schema.js'
const router = express.Router();
//IMPORT REGIONCONTROLLER
import RegionsController from '../controllers/RegionsController.mjs'
import baseMiddleware from '../shared/middleware/baseMiddleware.js'


//REGION ROUTES
//"baseMiddleware added for authentication purposes

router.post("/region-create",baseMiddleware,RegionsController.regioncreate);

router.get("/getregion",baseMiddleware,RegionsController.getregion);

router.get("/all-stars",RegionsController.allstars);

//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT

export default router;

