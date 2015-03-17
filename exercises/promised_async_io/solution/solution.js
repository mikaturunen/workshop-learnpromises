var Q = require("q");
var fs = require("fs");
var path = require("path");

Q.ninvoke(fs, "readFile", process.argv[2], { encoding: "utf8" })
    .done(console.log, console.log);

