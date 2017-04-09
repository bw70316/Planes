//initializes the firebase database

var config = {
    apiKey: "AIzaSyDzhidhdMdDHZihXGxCYfU0Gtt9XeWBDR0",
    authDomain: "awesome-airplanes.firebaseapp.com",
    databaseURL: "https://awesome-airplanes.firebaseio.com",
    projectId: "awesome-airplanes",
    storageBucket: "awesome-airplanes.appspot.com",
    messagingSenderId: "661695926029"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// below on click of the add airline button the inputs will add what the user puts in the text fields into a data set child. 

$("#add-airline-btn").on("click", function(event) {
  event.preventDefault();

var airlineName = $("#airline-input").val().trim();
var destName = $("#destination-input").val().trim();
var firstPlane = $("#first-input").val().trim();
var tfrequency = $("#frequency-input").val().trim();


//creates local object for holding data

var newAirline = {
  name: airlineName,
  destination: destName,
  firstPlane: firstPlane,
  frequency: tfrequency
};


// uploads data to my firebase "Awesome Airplanes"
database.ref().push(newAirline);


//clears form
$("#airline-input").val("");
$("#destination-input").val("");
 $("#first-input").val("");
 $("#frequency-input").val("");


return false;

});



// functions for adding a new plane into the table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());



var airlineName = childSnapshot.val().name;
var destName = childSnapshot.val().destination;
var firstPlane = childSnapshot.val().firstPlane;
var tfrequency = childSnapshot.val().frequency;



//use the moment jquery to convert military to standard time

//create the inital time by entering it into the firstPlane input of the form and push back a year to ensure it comes before current time (in case dates are messed up maybe?)
var firstPlaneConverted = moment(firstPlane, "hh:mm").subtract(1, "years");
console.log(firstPlaneConverted);

var currentTime = moment();

//difference bettween times
var diffTime = moment().diff(moment(firstPlaneConverted), "minutes");

//getting the remainder
var tRemainder = diffTime % tfrequency;

// figuring out next arrival of plan
var tMinutesTillPlane = tfrequency - tRemainder;

//next airplane added

var nextPlane = moment().add(tMinutesTillPlane, "minutes");




$("#schedule-table > tbody").append("<tr><td>" + airlineName + "</td><td>" + destName + "</td><td>"+ tfrequency +  "</td><td>" + nextPlane.format("hh:mm") + "</td><td>" + tMinutesTillPlane + "</td></tr>");

//add the inputs and calculations into a table through a train 
//add the formt for the "hh:mm", otherwise is goes to the seconds since some random date.



  
});