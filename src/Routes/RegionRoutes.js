import express from 'express';

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

