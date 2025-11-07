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
//model variable has to be named different than rest of variables used to export this model to other files
//hence why model is named "NewAgentSchema"
const NewAgentSchema = new mongoose.Schema({
first_name: {
    type:String,
    trim:true,
    required:false //changed to allow region controller to run
},
last_name: { 
    type:String,
    trim:true,
    required:false //changed to allow region controller to run

},
email: {
    type:String,
    trim:true,
    required:false //changed to allow region controller to run

},
region: { 
type:String,
trim:true,
required:true,
},
rating: { 
    type:Number,
    trim:true,
    required:false,
},
fee: {
    type:Number,
    trim:true,
    required:false,
},
sales: { 
    type:Number,
    trim:true,
    required:false,
    value: 0
    //I NEED TO ADD A MANAGER POSITION MOST LIKELY SO REGION SCHEMA CAN WORK W THIS?
    //I THINK I HAVE ACHIEVED THIS WITH REGIONSCHEMA
}           

});


//module exports to be used in other files
const AgentSchema = mongoose.model("AgentSchema",NewAgentSchema);
//New export [Common JS Format] default for Agent Model
module.exports = AgentSchema;


//OLD LINE (ES Modules) used for expport into app.js
//export default mongoose.model("Agent",AgentSchema)