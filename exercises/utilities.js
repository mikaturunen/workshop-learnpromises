
// Super simple utilities for the tests - as we are going through Promises we are 
// going to create a lot of artificial async behavior, this is why we need these
// and this way it's easier to keep them sync between tests so that all timeouts 
// in the tests are the same

var utilities = {
    timeoutShort: function(cb) {
        setTimeout(cb, 100);
    },

    timeoutNormal: function(cb) {
        setTimeout(cb, 500);
    },

    timeoutLong: function(cb) {
        setTimeout(cb, 1000);
    }
};

export = utilities;
