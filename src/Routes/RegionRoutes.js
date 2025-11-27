import express from 'express';

const router = express.Router();
//IMPORT REGIONCONTROLLER
import RegionsController from '../controllers/RegionsController.mjs'
// import baseMiddleware from '../shared/middleware/baseMiddleware.js' this is now changed to what line 7 contains
import { authMiddleware, authenticate } from '../shared/middleware/baseMiddleware.js';
//JWT Token Import


//REGION ROUTES
//"baseMiddleware" added for authentication purposes

router.post("/region-create",authMiddleware,RegionsController.regioncreate);

router.get("/getregion",authMiddleware,RegionsController.getregion);

//loginUser added for JWT method of authentication
router.get("/all-stars",authenticate,RegionsController.allstars);

//NECESSAY TO IMPORT WITHIN APPJS SO THESE FILES CAN COMMUNICATE IN MVC FORMAT

export default router;
