#!/usr/bin/env node

const workshopper = require("workshopper");
const path = require("path");

workshopper({
    name        : "node promises",
    title       : "Promise workshop",
    subtitle    : "Learn about promises and how they can be used",
    appDir      : __dirname,
    menuItems   : [  ],
    exerciseDir : path.join(__dirname, "./exercises/")
});
