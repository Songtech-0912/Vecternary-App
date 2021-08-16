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
            log("Error! Value exceeds range.")
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
document.addEventListener("DOMContentLoaded", function () {
    // Setup container of canvas
    canv_parent = document.getElementById("canvas-container");
    var canvas = new fabric.Canvas("app-canvas", {
        // Set drawing mode to true on start
        isDrawingMode: true
    });

    // Connect free drawing brush width and color controls
    canvas.freeDrawingBrush.color = 'rgba(255,255,255,.8)'

    // Create function for inserting new objects
    function insert(object) {
        // Finish this later
    }

    // Draw polygon tool
    // Nice functionality would be to actually use bezier curves
    // and to be able to edit each point node
    // but this is good enough
    // also nice would be the ability to use the enter key to
    // auto-complete the current polygon
    // making it possible to draw straight lines using this
    // (Source: https://github.com/WilliamEddy/fabricjs-pen-tool)

    // Add text and rectangle to canvas (this is just for testing)
    var text = new fabric.Textbox('Hello world from Vecternary Picasso', {
        left: 250,
        top: 200,
        fill: "white",
        width: 250,
        cursorColor: "white",
        fontSize: 24,
        fontFamily: "Inter"
    });
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#54616f',
        width: 100,
        height: 100
    });

    // Make canvas visually fill the positioned parent
    var canv_width = canv_parent.offsetWidth;
    var canv_height = canv_parent.offsetHeight;
    canvas.setWidth(canv_width);
    canvas.setHeight(canv_height);

    // Make sure that when the screen changes size, the canvas also scales
    // This does not work at all at the moment
    window.addEventListener('resize', function () {
        var canv_width = canv_parent.offsetWidth;
        var canv_height = canv_parent.offsetHeight;
        console.log("Width: " + canv_width + " Height: " + canv_height);
        canvas.setWidth(canv_width);
        canvas.setHeight(canv_height);
    });

    // Add elements to canvas
    canvas.add(rect);
    canvas.add(text);
    canvas.renderAll();

    /* FabricJS canvas logic begins here */
    var adjustModeButton = document.getElementById("adjust-mode"),
        drawModeButton = document.getElementById("drawing-mode");

    // Toggle the active class when modes change
    function toggleModes(activeBtn, inactiveBtn) {
        // Whevenever either button is clicked, we toggle the mode
        canvas.isDrawingMode = !canvas.isDrawingMode;
        // The active button should be inactivated
        // So we remove the bg-darkgray class
        activeBtn.classList.remove("bg-darkgray");
        // The other button doesn't have the bg-darkgray class
        // So we add it!
        inactiveBtn.classList.add("bg-darkgray");
    }

    adjustModeButton.onclick = function () {
        toggleModes(drawModeButton, adjustModeButton)
    };
    drawModeButton.onclick = function () {
        toggleModes(adjustModeButton, drawModeButton)
    };

    // When object is selected, choose color via colorpicker
    // var selected = canvas.getActiveObject()
    // colorPicker.color.hexString = selected.fillStyle;

    /* This section makes the toolbar buttons work */

    function activateTool(button) {
        var button = document.getElementById(button);
        button.onclick = function () {
            if (button.classList.contains("border-solid", "border-gray-400", "border-r-4") != true) {
                button.classList.add("border-solid", "border-gray-400", "border-r-4");
            }
        }
        // If the user clicks on another other element in the toolbar
        // we want to deactivate the button
        "#sidebar button:not(#draw-button)"
        var queryOthers = "#sidebar button" + ":not(#" + button.id + ")";
        var otherButtons = document.querySelectorAll(queryOthers);
        for (i = 0; i < otherButtons.length; i++) {
            otherButtons[i].onclick = function () {
                button.classList.remove("border-solid", "border-gray-400", "border-r-4");
            }
        }
    }

    activateTool("draw-button");
    // activateTool("eraser-button");

    // Randomly adjust position of newly added elements
    // This is to prevent elements from stacking over each other too much
    // When you add e.g. 20 circles
    function changePosRandom(shape) {
        var newX = shape.left + randInt(50, 350);
        var newY = shape.top + randInt(50, 350);
        shape.set('left', newX).setCoords();
        shape.set('top', newY).setCoords();
        canvas.requestRenderAll();
    }

    // Add circle button
    document.getElementById("circle-button").onclick = function () {
        log("Circle added!")
        var newCircle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: "#457f87",
            radius: 50
        });
        canvas.add(newCircle);
        newCircle.center();
        changePosRandom(newCircle);
        canvas.renderAll();
    }

    // Add rectangle/square button
    document.getElementById("rect-button").onclick = function () {
        log("Rectangle added!")
        var newRect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "#9f6e41",
            width: 100,
            height: 100
        });
        canvas.add(newRect);
        changePosRandom(newRect);
        canvas.renderAll();
    }

    // Add triangle button
    document.getElementById("triangle-button").onclick = function () {
        log("Triangle added!")
        var newTrig = new fabric.Triangle({
            left: 100,
            top: 100,
            fill: "#457f87",
            width: 100,
            height: 100
        });
        canvas.add(newTrig);
        changePosRandom(newTrig);
        canvas.renderAll();
    }

    // Add text button
    document.getElementById("textbox-button").onclick = function () {
        log("Text box added!")
        var newTextBox = new fabric.Textbox('Write something...', {
            left: 100,
            top: 100,
            fill: "white",
            width: 100,
            height: 100,
            cursorColor: "white",
            fontSize: 24,
            fontFamily: "Inter"
        });
        canvas.add(newTextBox);
        changePosRandom(newTextBox);
        canvas.renderAll();
    }
})

// Keybindings execution script
// This may or may not be removed in the future;
// that depends on how good VBundler is at purging unusued
// JS. Because this library, although small, is still 30KB 
// which may impact performance on large scenes
document.addEventListener("DOMContentLoaded", function load() {
    if (typeof canvas === "undefined") return setTimeout(load, 50);
    /* Delete function - bound to both del and backspace keys */
    Mousetrap.bind(['del', 'backspace'], function () {
        canvas.getActiveObjects().forEach((obj) => {
            canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll()
    });
    /* Undo + Redo functions - bound to cmd/ctrl (shift) z */

    var isRedoing = false;
    var h = [];
    Mousetrap.bind(['command+z', 'ctrl+z'], function () {
        // Finish code here
        log("Undo success!")
    });

    Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], function () {
        // Finish code here
        log("Redo success!")
    });
});