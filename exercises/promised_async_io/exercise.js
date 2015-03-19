var fs            = require("fs");
var path          = require("path");
var os            = require("os");
var exercise      = require("workshopper-exercise")();
var filecheck     = require("workshopper-exercise/filecheck");
var execute       = require("workshopper-exercise/execute");
var comparestdout = require("workshopper-exercise/comparestdout");
var wrappedexec   = require("workshopper-wrappedexec");
var boganipsum    = require("boganipsum");
var rimraf        = require("rimraf");
var testFile      = path.join(os.tmpDir(), "_promises_" + process.pid + ".txt");

// checks that the submission file actually exists
exercise = filecheck(exercise);
// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);
// compare stdout of solution and submission
exercise = comparestdout(exercise);
// wrap up the child process in a phantom wrapper that can
// mess with the global environment and inspect execution
exercise = wrappedexec(exercise);

// a module we want run just prior to the submission in the
// child process
exercise.wrapModule(require.resolve("../promise_wrap"));

// set up the data file to be passed to the submission
exercise.addSetup(function (mode, callback) {
    // mode == "run" || "verify"

    // supply the file as an arg to the "execute" processor for both
    // solution and submission spawn()
    // using unshift here because wrappedexec needs to use additional
    // args to do its magic
    this.submissionArgs.unshift(testFile);
    this.solutionArgs.unshift(testFile);
    var txt = boganipsum({ paragraphs: Math.ceil(Math.random()) });
    
    // file with random text
    fs.writeFile(testFile, txt, "utf8", callback);
});

// add a processor only for "verify" calls
exercise.addVerifyProcessor(function (callback) {
    var keys = Object.keys(exercise.wrapData.promiseCalls);
    
    if (keys.length <= 0) {
        this.emit("fail", exercise.__("fail.no.promises"));
        callback(null, false);
    } else {
        var testsDone = false;

        keys.forEach(function (fn) {
              fn = fn.toLowerCase();

              if (fn.indexOf("ninvoke") === -1) {
                  this.emit("fail", exercise.__("fail.ninvoke", { method: "Q." + fn + "()" }));
              } else {
                  this.emit("pass", exercise.__("pass.ninvoke", { method: "Q." + fn + "()" }));
              }
            }
            .bind(this));


    }    
});

// cleanup for both run and verify
exercise.addCleanup(function (mode, passed, callback) {
    // mode == 'run' || 'verify'
    rimraf(testFile, callback);
});

module.exports = exercise;
