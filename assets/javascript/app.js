var firebaseConfig = {
    apiKey: "AIzaSyBQBhKPWiAoENvX0Z9nlYyYgMHt62oLkbk",
    authDomain: "fir-bootcamp-f51e0.firebaseapp.com",
    databaseURL: "https://fir-bootcamp-f51e0.firebaseio.com",
    projectId: "fir-bootcamp-f51e0",
    storageBucket: "fir-bootcamp-f51e0.appspot.com",
    messagingSenderId: "239896199354",
    appId: "1:239896199354:web:5d71f05cbf64871a014283"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

 
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#inputName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  var trainTime = moment($("#inputTime").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#inputFrequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(trainName.name);
  console.log(trainDestination.destination);
  console.log(trainTime.time);
  console.log(trainFrequency.frequency);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#inputName").val("");
  $("#inputDestination").val("");
  $("#inputTime").val("");
  $("#inputFrequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);
/*
  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  */

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
    $("<td>").text(empRate),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});






  //<!-- Script -->

  <script>
    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  </script>

</body>

</html>
