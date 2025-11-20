//When working with the region schema, ONLY WORK WITH "REGION" requirements
import RegionSchema from '../shared/db/schemas.js/region.schema.js'

//when working with the agent schema, ONLY WORK WITH "AGENT" requirements
//Agent Schema import to reference AGENT related requirements
//THIS WILL BE USED WITH MANAGERS
import AgentSchema from '../shared/db/schemas.js/region.schema.js'


//REGION CREATE FUNCTION
    const regioncreate = async (req, res) => {
      //Change data to req.body and on the left hand side change the nature of the variable,
      //essentially = //const {}, and the items that make up the region
      const { manager, region, address } = req.body;
    
      try {
        // Check if region already exists
        const existingRegion = await RegionSchema.findOne({ region });
        if (existingRegion) {
          return res.status(400).json({ error: `Region ${region} already exists` });
        }
        // Create manager
        //WITH THE FORMAT OF "MANAGER.", THIS IS ALLOWS ME TO USE IDENTICAL OBJECTS IN POSTMAN 
        //WHILE ALSO AVOIDING THE DUPLICATE OBJECT KEY ERROR. THIS IS AVOIDED BY USING THE REGULAR
        //REQ.BODY FOR REGION OBJECTS!
        const newManager = await AgentSchema.create({
          first_name: manager.first_name,
          last_name: manager.last_name,
          email: manager.email,
          region: manager.region,
          sales: Number(manager.sales) || 0
        });
        //REFER TO COMMENTS ON LINE 43-45 FOR CLARIFICATION ON LACK OF FORMAT CONSISTENCY
        // Create new region
        const newRegion = await RegionSchema.create({
          region: region,
          address: address,
          manager: newManager._id, //this is an ID because the is what the schema reflects
          // manager: newManager._id, I don't need because this will be created by the AgentSchema
        });
    
        // Access newRegion here
        const allAgents = await AgentSchema.find({ region: newRegion.region });
        const topAgents = allAgents.sort((a, b) => b.sales - a.sales).slice(0, 3);
        const totalSales = allAgents.reduce((sum, agent) => sum + agent.sales, 0);

        //Save total sales so that it is avaliable for the getregion endpoint
        //Save top agents so that is is avaliable for the getregion endpoint
        newRegion.total_sales = totalSales;
        newRegion.top_agents = topAgents.map(agent => agent._id);
        await newRegion.save();

    
        res.status(201).json({
          message: `Region ${region} created successfully`,
          data: { newRegion, newManager, topAgents, totalSales},
        });
      } catch (error) {
        console.error('Failed to create region', error);
        res.status(500).json({ message: 'Failed to create region', error: error.message });
      }
    };
    

//GET REGION FUNCTION
const getregion = async (req, res) => {
  // grabs query params
// If you call /api/getregion?region=North, req.query.region will be "North".
// If no query is provided, region is undefined
  const { region } = req.query;
  try {
    // if a region is specified, return that one region only
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

//GET ALLSTARS FUNCTION
const allstars = async (req, res) => {
  try {
    const regions = ['North', 'South', 'East', 'West'];
    const allStars = [];
//"r" is the query object passed to Mongoose, all of the region values are being looped through
    for (const r of regions) {
      const topAgent = await AgentSchema.findOne({ region: r })
      //agents specific to the region are picked for the highest sales
        .sort({ sales: -1 })
        //limit 1 picks 1 agent in the case that there are multiple
        .limit(1)
        //lean allows for the Mongoose document to be returned
        .lean();

      if (topAgent) {
        allStars.push(topAgent);
      }
    }

    res.status(200).json({
      message: 'All-Star agents fetched successfully',
      count: allStars.length,
      data: allStars,
    });
  } catch (error) {
    console.error('Failed to fetch all-star agents', error);
    res.status(500).json({ message: 'Failed to fetch all-stars', error: error.message });
  }
};

//EXPORT TO ROUTES
//"EXPORT" only will not work for these, you must use export default,
//otherwise you run into the error: "SyntaxError: The requested module './RegionsController.mjs' does not provide an export named 'default' "
export default { regioncreate, getregion, allstars};
