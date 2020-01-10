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

$("#add-train-btn").on('click', function (event) {

  var trainName = $('#trainName-input').val().trim();
  var trainDestination = $('#trainDestination-input').val().trim();
  var firstTrainTime = $('#firstTrainTime-input').val();
  var frequency = $('#frequency-input').val();

  var newTrain = {
    train: trainName,
    destination: trainDestination,
    firstTime: firstTrainTime,
    trainFequency: frequency
  }
  database.ref().push(newTrain);

  alert("Train successfully added");

  $("#trainName-input").val("");
  $("#trainDestination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().trainFequency;
  var firstTrainTime = childSnapshot.val().firstTime;

  var firstTimeConverted = moment(firstTrainTime, 'HH:mm').subtract(1, 'years');
  console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log(tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log(moment(nextTrain).format("hh:mm"));

  var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(trainDestination),
    $('<td>').text(frequency),
    $('<td>').text(moment(nextTrain).format("hh:mm")),
    $('<td>').text(tMinutesTillTrain),
  );

  $("#train-table > tbody").prepend(newRow);
});