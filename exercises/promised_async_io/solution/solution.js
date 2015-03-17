var Q = require("q");
var fs = require("fs");
var path = require("path");

fs.readFile(path.join(__dirname, "..", "..", "content1"), function(error, data) {
    if (error) {
        throw error;
    }

    console.log(data);
});

