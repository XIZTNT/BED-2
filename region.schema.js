//iimport mongoose at the top
//add a const
//add a scheme (an agent schema which will create a new)
//title string, atuhor string, last name, (everythjing on dochebo)
//after buld upon thstructure, not necesarrily a string or number
//look at syntax
//agent.create 


// ES Module Syntax
// import mongoose from 'mongoose';

// Common JS
const mongoose = require('mongoose');
const RegionSchema = new mongoose.Schema({
region: {
    type:String,
    trim:true,
    required:true
},
address: { 
    type:String,
    trim:true,
    required:true
},
manager: {
    type:String,
    trim:true,
    required:true
},
top_agents: { 
type:String,
trim:true,
required:true,
}

});


//module exports to be used in other files
const RegionAgent = mongoose.model("RegionAgent",RegionSchema);
//New export [Common JS Format] default for Agent Model
module.exports = RegionAgent;


//OLD LINE (ES Modules) used for expport into app.js
//export default mongoose.model("Agent",AgentSchema)