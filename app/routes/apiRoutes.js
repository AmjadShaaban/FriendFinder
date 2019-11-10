var friends = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });



  app.post("/api/friends", function (req, res) {
    var scores = [];
    var totalDifference = [];
    for (var i = 0; i < friends.length; i++) {
      for (var j = 0; j < 10; j++) {
        scores[j] = Math.abs(req.body.scores[j] - friends[i].scores[j]);
      }
      // using array reduce function to add total Difference
      totalDifference[i] = scores.reduce((a, b) => a + b, 0)
      console.log("scores difference for friends array at index: " + i + "\n")
      console.log(scores)
      scores = [];

    }
    console.log("wiping scores array after each friends element\\n")
    console.log(scores)
    console.log("\n\ntotal Difference between each friends element\nSO, the index of the lowest value in the array if the closest frined match.\n")
    console.log(totalDifference)
    //Finding the index of the lowest value
    var min = Math.min.apply(null, totalDifference);
    //This is ALSO the index of the matching friend from friends array, I know I LOVE MATH
    var match = totalDifference.indexOf(min);
    console.log(match);

    friends.push(req.body);
    //send the matching friend JSON data as response to the AJAX call
    res.json(friends[match]);

  });
};