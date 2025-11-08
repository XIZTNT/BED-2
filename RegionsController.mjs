// HAD ISSUES WITH MULTIPLE TERMINALS OPEN
//Express Middlware
// const express = require('express');
// const app = express();
// app.use(express.json());
// //Added in to make sure parsing is a non-issue with Postman Requests
// // app.use(bodyParser.json()), no need to use
// const port = process.env.PORT || 5050
// const env = process.env.ENV || ""

//Mongo Manager
import "./mongo-manager.js"

//when working with the region schema, ONLY WORK WITH "REGION" requirements
//new function for agent create route, the schema is working with mongodb
import RegionSchema from "./region.schema.js"

//when working with the agent schema, ONLY WORK WITH "AGENT" requirements
//Agent Schema import to reference AGENT related requirements
//THIS WILL BE USED WITH MANAGERS
import AgentSchema from "./agent.schema.js"


//Adding RegionAPIData as a new collection to our existing Mongo DB ???
// const collection = MongoDBFile.collection(RegionAPIData);

//Change data to req.body and on the left hand side change the nature of the variable,
//essentially = //const {}, and the items that make up the region


//REGION CREATE ITEMS

const regioncreate = async (req, res) => {

const { region, address, manager, totalsales } = req.body;

  try {
  // check if region already exists
  const existingRegion = await RegionSchema.findOne({ region: region });
  if (existingRegion) {
    return res.status(400).json({ error: `Region ${region} already exists` });
  }

  // NEW REGION
const newRegion = await RegionSchema.create({
  region: req.body.region,
  address: req.body.address,
  manager: req.body.manager,
//i dont believe i need top agents here tbh
  total_sales: totalsales,
});
    res.status(201).json({
      message: `Region ${region} created successfully`,
      data: newRegion,
    });
  } catch (error) {
    console.error('Failed to create region', error);
    res.status(500).json({ message: 'Failed to create region', error: error.message });
  }
};

    // Get all agents for this region
    const allAgents = await RegionSchema.find({ newRegion });
    const topAgents = allAgents.sort((a, b) => b.sales - a.sales).slice(0, 3);
    const totalSales = allAgents.reduce((sum, agent) => sum + agent.sales, 0);

    // Create manager
    const manager = await AgentSchema.create({
      name: req.body.name,
      region: req.body.region,
      sales: 0,
    });

  

/**
 * GET /api/region?region=North
 * Returns info about all regions, or one region if specified
 */
const getregions = async (req, res) => {
  const { region } = req.query;

  try {
    // if a region is specified, return that region only
    if (region) {
      const regionData = await RegionSchema.findOne({ region });
      if (!regionData) {
        return res.status(404).json({ message: `Region '${region}' not found` });
      }
      return res.status(200).json(regionData);
    }

    // otherwise, return all regions (unique: true in schema prevents duplicates)
    const allRegions = await RegionSchema.find();
    res.status(200).json(allRegions);

  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ message: 'Failed to fetch regions', error: error.message });
  }
};

/**
 * GET /api/all-stars
 * Returns the top-selling agent in each region
 */
const allstars = async (req, res) => {
  try {
    const regions = ['North', 'South', 'East', 'West'];
    const allStars = [];

    for (const r of regions) {
      const topAgent = await AgentSchema.findOne({ region: r })
        .sort({ sales: -1 })
        .limit(1)
        .lean();

      if (topAgent) {
        allStars.push(topAgent);
      }
    }

    res.status(200).json({
      message: '🌟 All-Star agents fetched successfully',
      count: allStars.length,
      data: allStars,
    });
  } catch (error) {
    console.error('❌ Failed to fetch all-star agents', error);
    res.status(500).json({ message: 'Failed to fetch all-stars', error: error.message });
  }
};


//EXPORT TO ROUTES
//"EXPORT" only will not work for these, you must use export default,
//otherwise you run into the error: "SyntaxError: The requested module './RegionsController.mjs' does not provide an export named 'default' "
export default { regioncreate, getregions, allstars};

//Thoughts: What I may need to do is, import and require agents JS
// then name my "db = agent const for import"

//async function main() {
//probably need to connect o mongo somehow

//try catch here? {
//const db = ...add mongo database and name it here?
//add a new collection to the mongodatabase after being connected to it with const collection = db.collection('agents');

//await collection.insertMany(region:({North, East, West, South}))????

// } catch (err) {
//console.error("Error occured:', err));

//}????