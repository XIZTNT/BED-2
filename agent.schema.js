//iimport mongoose at the top
//add a const
//add a scheme (an agent schema which will create a new)
//title string, atuhor string, last name, (everythjing on dochebo)
//after buld upon thstructure, not necesarrily a string or number
//look at syntax
//agent.create 

import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema(
{
first_name: {
    type:String,
    trim:true,
    required:true
},
last_name: { 
    type:String,
    trim:true,
    required,true
},
email: {
    type:String,
    trim:true,
    required,true
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
}

}
)


//module exports to be used in other files

export default mongoose.model("Agent",AgentSchema)