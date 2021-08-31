// Tiny micro-lib custom-written for Vecternary
// used for input validation, number processing, helper functions, etc.

function isNumber(n) {
    "use strict";
    // Used to ensure that numbers parsed as strings
    // such as "89" or "203" are considered numbers as well
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

Number.prototype.between = function(upper, lower) {
    "use strict";
    // Used to ensure the number is between a certain range
    // such as 0 < x < 100
    // Returns true if in range, returns "is greater" if above
    // range, and returns " is lower" if below range
    var min = Math.min.apply(Math, [upper, lower]),
        max = Math.max.apply(Math, [upper, lower]);
    return this >= min && this <= max;
}

// Gets random number between 2 values
function randInt(lowerBound, upperBound) {
    return Math.floor((Math.random() * upperBound) + lowerBound);
}