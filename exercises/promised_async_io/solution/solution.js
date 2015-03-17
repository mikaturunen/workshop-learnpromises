var Q = require("q");
var fs = require("fs");
var path = require("path");

fs.readFile(
    process.argv[2], 
    { 
        encoding: "utf8" 
    }, 
    function(error, data) {
        if (error) {
            throw error;
        }

        console.log(data);
    });
