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
const NewRegionSchema = new mongoose.Schema({
region: {
    type:String,
    required:true,
    //unique is allowing a value to be assigned specifically to our region
    unique: true,
    //array here, nort, w, e, s
    enum: ["North", "East", "South", "West"] //took out "values and {}"
    
    //need enumeration for proper format "enum" (a string as an object)
},
address: { 
    type:String,
    //trim is only necessary for string types making sure there are no spaces after
    trim:true,
    required:false  
},
manager: {
    //
    type:mongoose.Schema.Types.ObjectId,
    //changed from "Agent" as that was previous Agent Schema export
    ref:"AgentSchema",
    required:false,
    unique: true,
},
top_agents: [{ // added array to fit multiple objects, rather than a singular one
type:mongoose.Schema.Types.ObjectId,
//changed from "Agent" as that was previous Agent Schema export
ref:"AgentSchema",
required:false,
}],
total_sales: { 
    type:Number,
    trim:true,
    required:false,
    default: 0 //changed from "default:0"? 
}

});


//module exports to be used in other files
const RegionSchema = mongoose.model("RegionSchema",NewRegionSchema);
//New export [Common JS Format] default for Agent Model
module.exports = RegionSchema;


//OLD LINE (ES Modules) used for expport into app.js
//export default mongoose.model("Agent",AgentSchema)