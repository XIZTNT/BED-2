import express from 'express';
//IMPORT REGIONCONTROLLER
import RegionsController from '../controllers/RegionsController.mjs'
//Check if all endpoints are responding
console.log("RegionsController:", RegionsController);

// Import baseMiddleware from '../shared/middleware/baseMiddleware.js' this is now changed to what line 7 contains
import { authMiddleware, authenticate } from '../shared/middleware/baseMiddleware.js';
//JWT Token Import
const router = express.Router();



//REGION ROUTES
//"baseMiddleware" added for authentication purposes

router.post("/region-create",authMiddleware,RegionsController.regioncreate);

router.get("/getregion",authMiddleware,RegionsController.getregion);

//loginUser added for JWT method of authentication
router.get("/all-stars",authenticate,RegionsController.allstars);
//add ",authenticate," back for JWT demonstration"

//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT

//temporary UPDATE
router.get("/refresh-regions",RegionsController.refreshregions)

export default router;
