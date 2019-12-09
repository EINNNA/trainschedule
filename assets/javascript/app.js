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
$("#add-employee-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#inputName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  var trainTime = moment($("#inputTime").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#inputFrequency").val().trim();

  if (trainName || trainDestination || trainTime || trainFrequency === "") {
    alert("Fill all fields");
  } else {
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
  }
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
