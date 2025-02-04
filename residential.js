
// EQUAL TO HTML CODE
const AgentBody = document.getElementById("AgentTableBody")

const AgentData = async () => {
  //INFO REQ
    const response = await fetch("http://99.79.77.144:3000/api/agents") 
    const data = await response.json()
    // conversion to JSON is to return usable data (precautionary)
    console.log(data) 
    //Taking information formed in "data"
    // Passing filtered data for "Ratings" Section
    const  SortedRatings = data.filter((a,b)=>{
      //passing rather than counting
      //do not put brackets "[]" these represent arrays
       if (a.rating >= 95)
         return 1;
       if (b.rating < 95)
         return -1;
       return 0
      })
    CreateTableBody (SortedRatings)
    return SortedRatings
  }
  AgentData() 
//  LINE 12  MEANS TO CALL THE FUNCTION


// NEW FUNCTION TO CREATE TABLE BODY
// Data within parenthesis is a placeholder until called function receives actual data
function CreateTableBody(data) {

//Create Table Rows with Agent Data

let something2 = ""

// Data is an array!!
//Within the foreach loop we need to take each individual agent and create a table row for agent
//We want javascript to know sone of the things we need are variables
// Backticks create a string for object literals (pass color red)
//ForEach recap: Each indiv object in the array, we want to do sonething with ea. indiv obj
// For each indiv thing, the array is going to do something w/ ea. indiv obj

data.forEach((agent) => {
    //Back ticks are strings, what you want to pass information to variables
  //Each indiv row 
const something =     `
    <tr>
    <td> ${agent.first_name}</td>
    <td> ${agent.last_name}</td>
    <td> ${agent.rating}</td>
    <td> ${agent.fee}</td>
    <td> ${agent.region}</td>
    </tr>

    `
    //Don't overwrite data, just add to it
    something2+=something
});
//Add to html code that already exists
AgentBody.innerHTML=""
AgentBody.innerHTML+=something2

}

//buttons migration 
const FirstNameSort = document.getElementById("SortableFirstName")
const LastNameSort = document.getElementById("SortableLastName")
const SortableRatings = document.getElementById("SortableRatings")
const RegionFilter = document.getElementById("RegionFilter")

//buttons event listeners
//async allows the function (async) to wait

//FIRST NAMES SORT!!!
FirstNameSort.addEventListener("click", async () => {
const FirstNames = await AgentData ()
//mini function inside of the bigger function
const SortedNames = FirstNames.sort((a, b)=>{
 if (a.first_name < b.first_name) return -1;
 if (a.first_name > b.first_name) return 1;
 return 0 
})
CreateTableBody (SortedNames)

})
console.log ("First Names")

//LAST NAME SORT!!!
LastNameSort.addEventListener("click", async () => {
 const LastNames = await AgentData ()
//mini function inside of the bigger function
const SortedNames = LastNames.sort((a, b)=>{
  // working through last name property
if (a.last_name < b.last_name) return -1;
if (a.last_name > b.last_name) return 1;
return 0 
})
CreateTableBody (SortedNames)
})

//RATINGS SORT!
// SortableRatings.addEventListener("click", async () => {
//   const Ratings = await AgentData () 
//  //mini function inside of the bigger function
// CreateTableBody(SortedRatings)
// })

//REGION FILTERING....add html and then bring event listenere
RegionFilter.addEventListener("change", async () => {
  const Regions = await AgentData ()
  //we got the data here now we need to compare it to the selection menu
 //mini function inside of the bigger function
 //what what is agent again????
 if (RegionFilter.value === "select") {
 CreateTableBody(Regions)
 //return means stop here
 return
 }
 
const FilteredRegions = Regions.filter((Agent)=>
Agent.region === RegionFilter.value
 )
CreateTableBody(FilteredRegions)
 })



// A function is only "done" is only till it's done it's job
// GET AGENT DATA, FROM THE FUNCTION ABOVE
//Function will create table rows with agent data
// USE TOOL .INNERHTML (allows you to create html code within Javascript
// and allows code to be inserted within HTML body
//write html code within a foreeach loop attached to agent data

   








