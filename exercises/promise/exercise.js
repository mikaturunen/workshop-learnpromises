var through2 = require("through2");
var hyperquest = require("hyperquest");
var bl = require("bl");
var exercise = require("workshopper-exercise")();
var filecheck = require("workshopper-exercise/filecheck");
var execute = require("workshopper-exercise/execute");
var comparestdout = require("workshopper-exercise/comparestdout");

// the output will be long lines so make the comparison take that into account
exercise.longCompareOutput = true;

// checks that the submission file actually exists
exercise = filecheck(exercise);
// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);
// compare stdout of solution and submission
exercise = comparestdout(exercise)

// set up the data file to be passed to the submission
exercise.addSetup(function (mode, callback) {
    this.submissionArgs = this.solutionArgs = 0;
    process.nextTick(callback);
});

module.exports = exercise;
