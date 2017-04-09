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

$("#add-airline-btn").on("click", function(event) {
  event.preventDefault();

var airlineName = $("#airline-input").val().trim();
var destName = $("#destination-input").val().trim();
var firstPlane = $("#first-input").val().trim();
var tfrequency = $("#frequency-input").val().trim();




var newAirline = {
  name: airlineName,
  destination: destName,
  firstPlane: firstPlane,
  frequency: tfrequency
};

database.ref().push(newAirline);

console.log(newAirline.name);
console.log(newAirline.destination)

$("#airline-input").val("");
$("#destination-input").val("");
 $("#first-input").val("");
 $("#frequency-input").val("");

return false;

});




database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

var airlineName = childSnapshot.val().name;
var destName = childSnapshot.val().destination;
var firstPlane = childSnapshot.val().firstPlane;
var tfrequency = childSnapshot.val().frequency;




var firstPlaneConverted = moment(firstPlane, "hh:mm").subtract(1, "years");
console.log(firstPlaneConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstPlaneConverted), "minutes");

var tRemainder = diffTime % tfrequency;

var tMinutesTillPlane = tfrequency - tRemainder;

var nextPlane = moment().add(tMinutesTillPlane, "minutes");
console.log("Arrival Time: " + moment(nextPlane).format("hh:mm"));



$("#schedule-table > tbody").append("<tr><td>" + airlineName + "</td><td>" + destName + "</td><td>"+ tfrequency +  "</td><td>" + nextPlane.format("hh:mm") + "</td><td>" + tMinutesTillPlane + "</td></tr>");




  
});