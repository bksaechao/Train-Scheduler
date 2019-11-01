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

    $("#button").on("click", function (event) {
        event.preventDefault();
        $(".trainData").val('');

        var trainVal = $
        var newTrain = $("<tr></tr>")
    });

})