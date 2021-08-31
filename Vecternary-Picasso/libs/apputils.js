// Tiny micro-lib custom-written for Vecternary
// used for input validation, number processing, helper functions, etc.

function isNumber(n) {
    "use strict";
    // Used to ensure that numbers parsed as strings
    // such as "89" or "203" are considered numbers as well
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

Number.prototype.between = function (upper, lower) {
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
    return Math.random() * (upperBound - lowerBound) + lowerBound;
}

// Returns a boolean of whether a value (eg. "hi")
// is in an array (e.g. "['hello', 'goodbye', 'hi']")
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

// Returns boolean of whether a key is in an object
function isInObject(value, object) {
    return Object.values(object).indexOf(value) > -1;
}

// Most important function here!
// It parses a html string and turns it into an HTML element
// Together with template literals, it makes creating dynamic
// HTML markup a breeze
function generateElement(markupString){
    // First, create a temporary DOM element
    var tempParentElement = document.createElement("div");
    tempParentElement.innerHTML = markupString;
    var generatedHTMLElement = tempParentElement.firstElementChild;
    return generatedHTMLElement
}