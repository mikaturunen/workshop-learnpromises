var Q = require("q");

/**
 * Wrapper module for wrapping Q into manageable chunks that allow the test case to easily detect were the correct
 * functions in Q called or not.
 * @module  wrapper
 * @param  {Object} ctx [description]
 */
function wrapper (ctx) {
    ctx.promiseCalls = { };

    // Wrap all the functions from Q
    Object
        .keys(Q)
        .forEach(function (fn) {
            var original = Q[fn];

            Q[fn] = function() {
                // $captureStack is a utility to capture a stacktrace array
                var stack = ctx.$captureStack(Q[fn]);

                // inspect the first callsite of the stacktrace and see if the
                // filename matches the mainProgram we're running, if so, then
                // the user has used the method in question
                // the substring() is necessary as the user doesn't have to provide
                // a .js extension to make it work
                if (stack[0].getFileName().substring(0, ctx.mainProgram.length) === ctx.mainProgram) {
                    if (!ctx.promiseCalls[fn]) {
                          ctx.promiseCalls[fn] = 1;
                    } else {
                        ctx.promiseCalls[fn]++;
                    }
                }

                // call the real function
                return original.apply(this, arguments);
            }
        });
}

module.exports = wrapper;
