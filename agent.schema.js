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
const AgentSchema = new mongoose.Schema({
first_name: {
    type:String,
    trim:true,
    required:true
},
last_name: { 
    type:String,
    trim:true,
    required:true
},
email: {
    type:String,
    trim:true,
    required:true
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
}           

});


//module exports to be used in other files
const Agent = mongoose.model("Agent",AgentSchema);
//New export [Common JS Format] default for Agent Model
module.exports = Agent;


//OLD LINE (ES Modules) used for expport into app.js
//export default mongoose.model("Agent",AgentSchema)