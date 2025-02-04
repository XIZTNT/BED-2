//post example

//get element by ids for object key value pairs
const FullName = document.getElementById("name")
const Email = document.getElementById("email")
const Phone = document.getElementById("phone")
const CompanyName = document.getElementById("company_name")
const ProjectName = document.getElementById("project_name")
const ProjectDescription = document.getElementById("project_description")
const Department = document.getElementById("department")
const Message = document.getElementById("message")


//OBJECT KEY VALUE PAIRS now within event listener
 
//fetch is the last thing that happens

  // CONTACT FORM VARIABLES AND FIELDS WITH ID'S

  // EQUAL TO HTML CODE
const POSTREQFunct = document.getElementById("fullsend")


POSTREQFunct.addEventListener("click", async () => {

  const data = {   
    fullname:FullName.value, 
    email:Email.value, 
    phone:Phone.value, 
    company_name:CompanyName.value, 
    project_name:ProjectName.value, 
    project_desc:ProjectDescription.value, 
    department:Department.value,
    message:Message.value,
    file:null, };
console.log (data) 

fetch('http://99.79.77.144:3000/api/contact', {
  method: 'POST',
  headers: {
    
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);

  })
  .catch((error) => {
    console.error('Error:', error);
  });

  // const ArrayData = await data () 
  // const ContactFieldsArray.map => }
  //   //map through data
  //   //even listener uptop
  //   const MapThru = ContactFieldsArray.map() => {

  //   MapThru() 

  //   }
  //   CreateTableBody(Something)
  // });

  




 })
//  LINE 12  MEANS TO CALL THE FUNCTION

//   MAKE VARIABLES, MAKE CONTACT FORM AND FIELDS, URL API CONTACT (grab all of these in IDs on index
// USE AN ARRAY TO MAP THROUGH ALL OF THEM)

// do an event listener that will pass

// MAKE A VARIABLE WITH GET ELEMINT ID AND ID FOR CONTACT Form 

// MAKE THE FUNCTION ASYNC AND TRY CATCH

// WE WILL NEED A TRY CATCH to build out llogic


// this will be smiliar to data agent on the other fomr but it will be diffrent and will use .map

// THEN WE'LL HAVE DATA VARIABLE TO LOOP THROUGH OBJECTS

// .MAP FUNCTION AND PROPE3RTY

//instead of map filtering it will be input name and input value