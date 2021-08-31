// Setup colorpickers for iro.js; this goes FIRST
var colorPicker = new iro.ColorPicker("#colorpicker", {
    layout: [{
        component: iro.ui.Box,
        options: {}
    },
    {
        component: iro.ui.Slider,
        options: {
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'hue'
        }
    },
    ],
    // Set default color to #384858
    color: "#384858",
    layoutDirection: "horizontal",
    width: "200",
});

// Add color picker events to detect change in color
// Code shamelessly copied from https://codepen.io/rakujira/pen/WZOeNq?editors=1010 :)
// Credit: James Daniel

var hexColorInputBox = document.getElementById("hexColorInputBox");
// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on(["color:init", "color:change"], function (color) {
    hexColorInputBox.value = color.hexString;
});

hexColorInputBox.addEventListener('change', function () {
    colorPicker.color.hexString = this.value;
});

// Setup script for all variable names
var lw_input = document.getElementById("lineWidthInput");
var sw_input = document.getElementById("shadowWidthInput");
var so_input = document.getElementById("shadowOffsetInput")

// Setup script for sliders and inputs
// Create line width slider via JS
var lw_slider = new RangeSlider(
    document.getElementById("lineWidthSlider"), {
    design: "2d",
    theme: "custom",
    size: "medium",
    handle: "round",
    popup: null,
    showMinMaxLabels: false,
    min: 0,
    max: 100,
    value: 30,
    onmove: function (x) {
        lw_input.value = x;
    }
});

// Connect line width input box to slider
function linewidthInput(width) {
    // Check that input is a number
    if (isNumber(width) == true) {
        width = parseInt(width);
        // Checks if width is between 0 and 100
        if (width.between(0, 100)) {
            // If input is number within bounds we set it as slider value
            lw_slider.setValue(width);
        } else {
            // We log the error
            log("Error 521: line width value exceeds range");
            console.warn("E521: line width value exceeds range");
            // TODO: Add red outline around input box
            // Reset value
            lw_slider.setValue(50);
        }
    } else {
        // If input is not number we don't change slider value
        log("Error: Incorrect type! Inputted type " + typeof (width));
        // Reset value
        lw_slider.setValue(50);
    }
}

// Create shadow width slider via JS
var sw_slider = new RangeSlider(
    document.getElementById("shadowWidthSlider"), {
    design: "2d",
    theme: "custom",
    size: "medium",
    handle: "round",
    popup: null,
    showMinMaxLabels: false,
    min: 0,
    max: 100,
    value: 10,
    onmove: function (x) {
        sw_input.value = x;
    }
});

// Connect shadow width input box to slider
function shadowWidthInput(width) {
    // Check that input is a number
    if (isNumber(width) == true) {
        width = parseInt(width);
        // Checks if width is between 0 and 100
        if (width.between(0, 100)) {
            // If input is number within bounds we set it as slider value
            sw_slider.setValue(width);
        } else {
            // We log the error
            log("Error! Value exceeds range.")
            // Reset value
            sw_slider.setValue(50);
        }
    } else {
        // If input is not number we don't change slider value
        log("Error: Incorrect type! Inputted type " + typeof (width));
        // Reset value
        sw_slider.setValue(10);
    }
}

// Create shadow offset slider via JS
var sw_slider = new RangeSlider(
    document.getElementById("shadowOffsetSlider"), {
    design: "2d",
    theme: "custom",
    size: "medium",
    handle: "round",
    popup: null,
    showMinMaxLabels: false,
    min: 0,
    max: 100,
    value: 10,
    onmove: function (x) {
        so_input.value = x;
    }
});

// Connect shadow offset input box to slider
function shadowOffsetInput(width) {
    // Check that input is a number
    if (isNumber(width) == true) {
        width = parseInt(width);
        // Checks if width is between 0 and 100
        if (width.between(0, 100)) {
            // If input is number within bounds we set it as slider value
            so_slider.setValue(width);
        } else {
            // We log the error
            log("Error! Value exceeds range.")
            // Reset value
            so_slider.setValue(50);
        }
    } else {
        // If input is not number we don't change slider value
        log("Error: Incorrect type! Inputted type " + typeof (width));
        // Reset value
        so_slider.setValue(10);
    }
}

// Setup script for initializing Canvas.js and running CanvasJS functions

// Setup container of canvas
canv_parent = document.getElementById("canvas-container");
var canvas = new fabric.Canvas("app-canvas", {
    // Set drawing mode to false on start
    // In the future this should be a user-specified setting
    isDrawingMode: false
});

// Connect free drawing brush width and color controls
canvas.freeDrawingBrush.color = 'rgba(255,255,255,.8)'

// Draw polygon tool
// Nice functionality would be to actually use bezier curves
// and to be able to edit each point node
// but this is good enough
// also nice would be the ability to use the enter key to
// auto-complete the current polygon
// making it possible to draw straight lines using this
// (Source: https://github.com/WilliamEddy/fabricjs-pen-tool)

// Default text to display on startup
var text = new fabric.Textbox('Hello world from Vecternary Picasso', {
    left: 250,
    top: 200,
    fill: "white",
    width: 250,
    cursorColor: "white",
    fontSize: 24,
    fontFamily: "Inter"
});
// Add elements to canvas
canvas.add(text);
canvas.renderAll();

function setCanvasDimensions() {
    // Make canvas visually fill the positioned parent
    var canv_width = canv_parent.offsetWidth;
    var canv_height = canv_parent.offsetHeight;
    console.log(`Canvas size set to ${canv_width}px by ${canv_height}px`)
    canvas.setWidth(canv_width);
    canvas.setHeight(canv_height);
}

// Make sure that when the screen changes size, the canvas also scales
// This does not work at all at the moment
window.addEventListener('resize', function () {
    setCanvasDimensions();
});

// Also adjust the canvas size dynamically on load
window.addEventListener("DOMContentLoaded", function () {
    setCanvasDimensions();
})

/* FabricJS canvas logic begins here */
var adjustModeButton = document.getElementById("adjust-mode"),
    drawModeButton = document.getElementById("drawing-mode");

// Toggle the active class when modes change
// function toggleModes(modeButton) {
//     // Whevenever either button is clicked, we toggle the mode
//     canvas.isDrawingMode = !canvas.isDrawingMode;
//     // The active button should be inactivated
//     // So we remove the bg-darkgray class
//     activeBtn.classList.remove("bg-darkgray");
//     activeBtn.classList.add("bg-none");
//     // The other button doesn't have the bg-darkgray class
//     // So we add it!
//     inactiveBtn.classList.remove("bg-none");
//     inactiveBtn.classList.add("bg-darkgray");
// }

// Toggle the active class when modes change
function toggleModes(modeButton) {
    // Check which type of button it is
    if (modeButton.id === "adjust-mode") {
        canvas.isDrawingMode = false;
        canvas.renderAll();
    } else if (modeButton.id === "drawing-mode") {
        canvas.isDrawingMode = true;
        canvas.renderAll();
    } else {
        log(`Error 820: Received invalid id ${modeButton.id}`)
    }
}

function cleanModeButtonClasses() {
    // Clean classes - prevents bug in which
    // classes are continuously overridden
    // by previously added ones
    // So the polluted classlist would be like:
    // ["bg-none", "bg-darkgray", "bg-none", "bg-darkgray", ...]
    modeBtns = [adjustModeButton, drawModeButton];
    modeBtns.forEach(function (btn) {
        cleanExistingClasses(btn);
    })
}

function cleanExistingClasses(modeButton) {
    // As the adjust/drawing mode button may have previously added classes
    // we want to remove all previously applied classes
    previouslyAppliedClasses = ["bg-darkgray", "bg-none"]
    previouslyAppliedClasses.forEach(function (element) {
        if (modeButton.classList.contains(element)) {
            modeButton.classList.remove(element);
        }
    })
}
function changeModeBtnColors() {
    if (canvas.isDrawingMode) {
        cleanModeButtonClasses();
        adjustModeButton.classList.add("bg-none");
        drawModeButton.classList.add("bg-darkgray");
    } else {
        cleanModeButtonClasses();
        adjustModeButton.classList.add("bg-darkgray");
        drawModeButton.classList.add("bg-none")
    }
}

window.addEventListener("load", changeModeBtnColors);
adjustModeButton.onclick = function () {
    toggleModes(adjustModeButton);
    changeModeBtnColors();
};
drawModeButton.onclick = function () {
    toggleModes(drawModeButton);
    changeModeBtnColors();
};

// When object is selected, choose color via colorpicker
// var selected = canvas.getActiveObject();
// console.log("Selected:", selected, selected.length);
// colorPicker.color.hexString = selected.fillStyle;

// Function class to create new shapes
class objectFactory {
    create(type) {
        var shape = null;
        switch (type) {
            case "select": {
                // Set free drawing mode to false
                canvas.isDrawingMode = 0;
                break;
            }
            case "brush": {
                // Set free drawing mode to true
                // canvas.isDrawingMode = 1;
                break;
            }
            case "pen": {
                // Polyline not finished yet
                log("Sorry, feature still in development");
                break;
            }
            case "rect": {
                // create a rectangle object
                shape = new fabric.Rect({
                    fill: "#9f6e41",
                    width: 150,
                    height: 150
                });
                // Add it onto canvas
                canvas.add(shape);
                // Shift position to avoid overlaps
                changePosRandom(shape);
                console.log(`Created rectangle at x: ${shape.left} and y: ${shape.top}`)
                canvas.setActiveObject(shape);
                canvas.renderAll();
                break;
            }
            case "circ": {
                // create an ellipse object
                shape = new fabric.Circle({
                    fill: "#457f87",
                    radius: 50
                });
                // Add it onto canvas
                canvas.add(shape);
                // Shift position to avoid overlaps
                changePosRandom(shape);
                console.log(`Created circle at x: ${shape.left} and y: ${shape.top}`)
                canvas.setActiveObject(shape);
                canvas.renderAll();
                break;
            }
            case "text": {
                // create a new text object
                shape = new fabric.Textbox("New text", {
                    fill: "white",
                    width: 250,
                    fontSize: 24,
                    fontFamily: "sans-serif"
                });
                canvas.add(shape);
                // Shift position to avoid overlaps
                changePosRandom(shape);
                console.log(`Created text at x: ${shape.left} and y: ${shape.top}`)
                canvas.setActiveObject(shape);
                canvas.renderAll();
                break;
            }
            case "triangle": {
                // create a new triangle object
                shape = new fabric.Triangle({
                    width: 100,
                    height: 100,
                    fill: "#457f87"
                });
                canvas.add(shape);
                // Shift position to avoid overlaps
                changePosRandom(shape);
                console.log(`Created triangle at x: ${shape.left} and y: ${shape.top}`)
                canvas.setActiveObject(shape);
                canvas.renderAll();
                break;
            }
            default: {
                console.warn("E729: Invalid tool chosen");
            }
        }
    }
}

// Declaring clipboard variable here to be used later, unfortunately
// the copy and paste functions need a global variable to modify
let _clipboard;

// Class for handling actions done to objects on the canvas
class canvasActions {
    action(actionType) {
        switch (actionType) {
            /* Copy and paste code taken from Fabric.js demos */
            case "copy": {
                // clone what are you copying since you
                // may want copy and paste on different moment.
                // and you do not want the changes happened
                // later to reflect on the copy.
                canvas.getActiveObject().clone(function (cloned) {
                    _clipboard = cloned;
                });
                break;
            }
            case "paste": {
                // clone again, so you can do multiple copies.
                _clipboard.clone(function (clonedObj) {
                    canvas.discardActiveObject();
                    clonedObj.set({
                        left: clonedObj.left + 10,
                        top: clonedObj.top + 10,
                        evented: true,
                    });
                    if (clonedObj.type === 'activeSelection') {
                        // active selection needs a reference to the canvas.
                        clonedObj.canvas = canvas;
                        clonedObj.forEachObject(function (obj) {
                            canvas.add(obj);
                        });
                        // this should solve the unselectability
                        clonedObj.setCoords();
                    } else {
                        canvas.add(clonedObj);
                    }
                    _clipboard.top += 10;
                    _clipboard.left += 10;
                    canvas.setActiveObject(clonedObj);
                    canvas.requestRenderAll();
                });
                break;
            }
            case "group": {
                if (!canvas.getActiveObject()) {
                    return;
                }
                if (canvas.getActiveObject().type !== 'activeSelection') {
                    return;
                }
                canvas.getActiveObject().toGroup();
                canvas.requestRenderAll();
                break;
            }
            case "ungroup": {
                if (!canvas.getActiveObject()) {
                    return;
                }
                if (canvas.getActiveObject().type !== 'group') {
                    return;
                }
                canvas.getActiveObject().toActiveSelection();
                canvas.requestRenderAll();
                break;
            }
            case "undo": {
                console.log("Undo successful!");
                break;
            }
            case "redo": {
                console.log("Redo successful!");
                break;
            }
            case "remove": {
                console.log("Deleted selected item!");
                canvas.getActiveObjects().forEach((obj) => {
                    canvas.remove(obj);
                });
                canvas.discardActiveObject().renderAll();
                break;
            }
            case "clear": {
                /* TODO: Confirm clear canvas before doing this */
                console.log("Canvas cleared!");
                canvas.remove(...canvas.getObjects());
                break;
            }
        }
    }
}

/* Initialize our classes for them to work */
var objects = new objectFactory();
var actions = new canvasActions();

/* This section makes the toolbar buttons work using event delegation */
var sidebar = document.getElementById("sidebar")
// Event delegation allows us to track the ID clicked on programmically
sidebar.addEventListener("click", function (event) {
    let target = event.target;
    let targetID = target.id;
    // We want to make sure that the clicked item is a button
    let validTargets = ["draw-button", "eraser-button", "circle-button", "rect-button", "triangle-button", "textbox-button"];
    if (isInArray(targetID, validTargets) === false) {
        console.warn("E821: invalid sidebar button ID!")
        log("Error 821: invalid sidebar button ID!")
    }
    switch (targetID) {
        case "draw-button":
            objects.create("brush");
            break;
        case "eraser-button":
            log("Sorry, feature still under development")
            break;
        case "circle-button":
            objects.create("circ");
            break;
        case "rect-button":
            objects.create("rect");
            break;
        case "triangle-button":
            objects.create("triangle");
            break;
        case "textbox-button":
            objects.create("text");
            break;
        default:
            console.warn("E802: Invalid tool chosen");
            log("Error 802: Invalid tool chosen")
            break;
    }
})

// TODO: Make the right border change to the sidebar button
// that is currently active

// Randomly adjust position of newly added elements
// This is to prevent elements from stacking over each other too much
// When you add e.g. 20 circles
function changePosRandom(shape) {
    var newX = canvas.width * randInt(0.15, 0.85);
    var newY = canvas.height * randInt(0.15, 0.85);
    shape.set('left', newX).setCoords();
    shape.set('top', newY).setCoords();
    canvas.requestRenderAll();
}

// Purpose: returns boolean of whether more than 1 object is selected
function isMultiSelection() {
    var isMultiSelection = false;
    var numOfSelectedObjs = canvas.getActiveObjects().length;
    if (numOfSelectedObjs > 1) {
        log(`Selected ${numOfSelectedObjs} objects`)
        isMultiSelection = true;
    }
    return isMultiSelection
}

function manageSelectionColor() {
    if (isMultiSelection() === true) {
        // Now we get an array of all colors in all selected objects
        let multiselectColors = [];
        canvas.getActiveObjects().forEach(function (selectedObj) {
            // Convert whatever format the color is specified to HEX
            // Fabric.js behaves weirdly in that it omits the "#" symbol
            // So a hex color like #FFFFFF turns to just 'FFFFFF' which,
            // it turns out, causes iro.js to choke! Cuz it interprets that
            // as an invalid color code!
            // Dunno why the fabric.js devs decided to do this...
            fillColor = "#" + new fabric.Color(selectedObj.fill).toHex();
            multiselectColors.push(fillColor);
        })
        let selectedColorsText = multiselectColors.join(", ")
        console.log(`Selected ${multiselectColors.length} objects of colors: ${selectedColorsText}`);
        // So now we show the multiselect color dialog
        let multiSelectColorsWidget = generateElement(`<div id="multiSelectColorsWidget">
            <label class="block my-4 font-medium text-gray-200 text-md align-left" for="selectedcolors">${multiselectColors.length} colors in selection</label>
            <div id="selectedcolors" class="space-y-6">
                <!-- Color blocks go here -->
            </div>
        </div>`);
        multiselectColors.forEach(function (color, index) {
            let colorIndex = index + 1;
            let colorID = "multiSelectColor" + colorIndex;
            let colorBlockMarkup = generateElement(`<div class="flex flex-row items-center justify-around w-full px-4 py-6 text-gray-200 rounded-lg bg-softgray">
                <!-- Circle preview of color -->
                <div class="w-8 h-8 mx-1 border-2 border-gray-500 border-opacity-50 rounded-full shadow" style="background-color: ${color};"></div>
                <!-- Color hex code -->
                <div class="mx-1 text-sm">${color}</div>
                <!-- Apply button -->
                <button id="${colorID}" class="px-4 py-2 mx-1 text-sm rounded-lg bg-darkgray" data-hexcode="${color}">Apply to all</button>
            </div>`);
            multiSelectColorsWidget.children[1].appendChild(colorBlockMarkup);
        })
        // Hide picker and show element
        document.getElementById("picker").classList.add("hidden");
        multiSelectClassList = [].slice.call(document.getElementById("multiselect").classList);
        if (isInArray("hidden", multiSelectClassList)) {
            document.getElementById("multiselect").classList.remove("hidden");
        }
        document.getElementById("multiselect").appendChild(multiSelectColorsWidget);
        // Event delegation for the "apply to all" buttons
        document.getElementById("selectedcolors").addEventListener("click", function(event){
            let targetID = event.target.id;
            // All "apply" buttons have ids which are 17 characters long
            if (targetID.length === 17) {
                applyColor = document.getElementById(targetID).dataset.hexcode;
                console.log(`Color being applied to selection: ${applyColor}`)
                log(`Applied ${applyColor} to all selected objects`)
                applyColorToAll(applyColor);
            }
        })
    } else {
        let selectedColor = canvas.getActiveObjects()[0].fill;
        let selectedHexColor = "#" + new fabric.Color(selectedColor).toHex();
        console.log(`Selected one object of color '${selectedHexColor}'`)
        // Sync colorpicker to selection color
        colorPicker.color.hexString = selectedHexColor;
        // Now, whenever the colorpicker color changes, we
        // need to change the object fill color accordingly
        colorPicker.on(["color:init", "color:change"], function() {
            var pickerColor = colorPicker.color.hexString;
            canvas.getActiveObject().set("fill", pickerColor);
            canvas.renderAll();
        });
    }
}

function hideMultiSelectUI() {
    console.log("Selection was cleared")
    document.getElementById("multiselect").classList.add("hidden");
    // Clean the generated markup for the multiselect colors
    document.getElementById("multiselect").innerHTML = "";
    document.getElementById("picker").classList.remove("hidden");
}

function applyColorToAll(color) {
    // Color needs to be in hex code format
    canvas.getActiveObjects().forEach(function(object){
        object.set("fill", color);
        // Update the canvas with the changed color
        canvas.renderAll();
    })
}

// Event handlers for canvas
canvas.on({
    'selection:updated': manageSelectionColor,
    'selection:created': manageSelectionColor,
    'selection:cleared': hideMultiSelectUI
});

// Set the keybindings
// This may or may not be removed in the future;
// that depends on how good VBundler is at purging unusued
// JS. Because this library, although small, is still 30KB
// which may impact performance on large scenes

/* Delete function - bound to both del and backspace keys */
Mousetrap.bind(['del', 'backspace'], function () {
    log("Object deleted!")
    actions.action("remove");
});
/* Undo + Redo functions - bound to cmd/ctrl (shift) z */
Mousetrap.bind(['command+z', 'ctrl+z'], function () {
    // Finish code here
    log("Undo success!")
});

Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], function () {
    // Finish code here
    log("Redo success!")
});

/* Copy, paste and duplicate */
Mousetrap.bind(['command+c', 'ctrl+c'], function () {
    log("Copied!")
    actions.action("copy");
})

Mousetrap.bind(['command+v', 'ctrl+v'], function () {
    actions.action("paste");
})

Mousetrap.bind('shift+d', function () {
    // Duplicating is basically copy then paste
    actions.action("copy");
    actions.action("paste");
})

// Group and unground with ctrl g and ctrl shift g
Mousetrap.bind(['command+g', 'ctrl+g'], function () {
    actions.action("group");
})

Mousetrap.bind(['command+shift+g', 'ctrl+shift+g'], function () {
    actions.action("ungroup");
})

// throw new Error("The world is coming to an end! You will die! Hahahahahahaha!")
// colourNameToHex("die!")