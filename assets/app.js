$(document).ready(function () {
    // Linking & initializing firebase
    var firebaseConfig = {
        apiKey: "AIzaSyC9JxsGCnXOPvhfmqZhxQqSQUd4id1Iv6o",
        authDomain: "train-scheduler-76f0c.firebaseapp.com",
        databaseURL: "https://train-scheduler-76f0c.firebaseio.com",
        projectId: "train-scheduler-76f0c",
        storageBucket: "train-scheduler-76f0c.appspot.com",
        messagingSenderId: "622609698920",
        appId: "1:622609698920:web:88ac8554bb28404d52ebdd"
    };
    firebase.initializeApp(firebaseConfig);
    console.log("hi")

    var database = firebase.database();

    // Starting variables
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    $("#button").on("click", function (event) {
        event.preventDefault();
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Assumptions
        var tFrequency = frequency;

        // Time is 3:30 AM
        var firstTime = firstTrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // Current Time
        var currentTime = moment();
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        var minAway = tMinutesTillTrain;
        // Next train time
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var newTrain = moment(nextTrain).format("hh:mm");
        console.log(tMinutesTillTrain);

        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            newTrain: newTrain,
            minAway: minAway,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // Clears form values
        $(".trainData").val('');
    });

    // Captures form values and appends data to the Current Train Schedule table.
    database.ref().on("child_added", function (childSnapshot) {
        var minAway = childSnapshot.val().tMinutesTillTrain;
        $("#listT").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + childSnapshot.val().newTrain +
            "</td><td>" + childSnapshot.val().minAway + "</tr></td>");
        var time = moment().format("MM/DD/YY hh:mm A");
    }), function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }

})