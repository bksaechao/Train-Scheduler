$(document).ready(function () {
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

    var database = firebase.database();

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

        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $(".trainData").val('');
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log("+- calling child_added");

        $("#listT").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency + "</tr></td>");
    }), function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }

})