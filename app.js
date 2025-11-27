import AgentRouteEndPoints from './src/routes/AgentRoutes.js'
import RegionRouteEndPoints from './src/routes/RegionRoutes.js'
import AuthenticationRoutes from './src/routes/AuthenticationRoutes.js'
//Postman can read "cookies"
import cookieParser from "cookie-parser";

import dotenv from 'dotenv'
dotenv.config()
//Express Middleware
import express from 'express';
const app = express();
app.use(express.json());
//Added in to make sure parsing is a non-issue with Postman Requests
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.json()), no need to use
const port = process.env.PORT || 5050

//Mongo Manager Open Connection
import { openMongoConnection } from './src/shared/db/mongo-manager.js';
openMongoConnection();
app.listen(port, () => {
  //app.get(do more research to setup api endpoint and call function)
  console.log(` server listening on port ${port} `)
})

app.use(cookieParser()); //allows JWT to function BEFORE ROUTES, and note the parentheses
//AGENT, REGION, AND JWT ENDPOINT CALLS
app.use("/agent", AgentRouteEndPoints);
//
app.use("/region", RegionRouteEndPoints);
//
// app.use("/",JWTRouteEndPoints)
app.use('/auth', AuthenticationRoutes)






//Comments/NOTES

//Field Value Pairs for Mongo
// {name: James,
// height: Tall,
//

//Below: IN relation to creating original Agent Routes
//Install Package Manager Tomorrow

//I WILL NEED TO IMPORT MY CONTROLLER JS FILE
// const agentController = require('./controller.js');

//MVC = THINK OF THE CONTROLLER LIKE A CAR, (ITS WHAT GETS YOU THERE), and the ROUTE IS THE ROAD, THE ROUTE IS THE PURPOSE TO COMMMUNICATE WHAT IS IN THE CONTROLLER TO APP JSS, ROUTES PASS THE INFO FROM CONTROLLERS TO EXPRESS IN WHICH PASSES
//if theres an issue its issolated, , and you know where everything is...

//Region Create Route

//add controllers, look @ docebo for file tree, I am sorting through mongoose data rather than "adding agents"

//jsagent.map needs to map something specific
//you have to tell .join what to join
//Look up .map and also .join (two methods to get the email list and deliniate, an email list separated by commas)
//You should use the "jsagents" for this section


// AgentRouteEndPoints, will need to change for these imports later
//MIDDLEWARE ROUTE FOR AUTHENTICATION - NOT NECESSARY DUE TO TIES TO REGION ROUTES
// import authMiddleware from './shared/middleware/baseMiddleware.js';
//const RoutesforRegion = require ('./RegionRoutes')
//NEW "get" USAGE for postman
//This tells me that I'm using my routes that is connected to the controller file, 
//while using the specific route, in this case agent create, within the "AgentRoutes file"
//AGENT CALLBACK ROUTES FOR POSTMAN