//post example

const data = { username: 'example' };
fetch('http://127.0.0.1:5500/index.html#contact', {
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

  // CONTACT FORM VARIABLES AND FIELDS WITH ID'S

  // EQUAL TO HTML CODE
const POSTREQFunct = document.getElementById("fullsend")


POSTREQFuncts.addEventListener("click", async () => {

  const data = { username: 'example' };
fetch('http://127.0.0.1:5500/index.html#contact', {
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

  const Something = await data () 
  const ArrayData = ["Full Name", "Email Address", "Phone", "Company Name", "Project Name", "Project Description", "Department"];
    //map through data
    const MapThru = ArrayData.map

    Mapthru() => {

    }
    CreateTableBody(Something)
  });

  




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