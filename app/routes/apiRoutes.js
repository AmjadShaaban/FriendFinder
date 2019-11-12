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
    }
    //Finding the index of the lowest value
    var min = Math.min.apply(null, totalDifference);
    //This is ALSO the index of the matching friend from friends array, I know I LOVE MATH
    var match = totalDifference.indexOf(min);
    friends.push(req.body);
    //send the matching friend JSON data as response to the AJAX call
    res.json(friends[match]);

  });
};