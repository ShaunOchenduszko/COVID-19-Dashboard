// feed info from drop down menu into this STATE variable 
// use the ON.Change This function from visualizations hw 
// flask handles state that is passed 


function StateChanged(){
    var dropdownMenu = d3.select("#States");
    var state = dropdownMenu.property("value");
    
    d3.json(`/cov/${state}`).then(data=> {
        console.log(data);
    })

}
function DateChanged(){
    var dropdownMenu = d3.select("#Dates");
    var date = dropdownMenu.property("value");
    
    d3.json(`/cov1/${date}`).then(data=> {
        console.log(data);
    })

}


// render index first  with / route 
// neeed to link drop down select menu to the /cov/<state> route

// current problem is that it is returning an unresolved promise 

// would process be to render a new dynamic url every time a selection is made 
// then pass it into the route? Would I need to get the url on the website for that 
// hence the window.location.href; at the top

