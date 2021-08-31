document.addEventListener("DOMContentLoaded", function load() {
    if (typeof canvas === "undefined") return setTimeout(load, 50);
    canvas.on({
        'selection:updated': HandleElement,
        'selection:created': HandleElement
    });

    // Ideally this would be a generalized function that can
    // be called with HandleElement(obj, myfunc) to deal with
    // everything from changeing the selected element's color
    // to the size/position/orientation of the object

    // Unfortunately this ability is not yet possible
    // So everything has to be written in a vendor specific way

    // Handle colorpicker
    function HandleElement(obj) {
        // We need to be able to handle multiple selected objects
        // When object is selected, we want to get its
        // current color and set the colorpicker to that color
        var currentColor = obj.target.fill;
        if (this.multiSelect) {
            log("Multiselect objects!")
        } else {
            // This is the hacky part
            // We need to check whether the color is in hex format
            // If the color is in hex format we use color.hexString
            // If not, we need to convert that color to a hexString
            if (currentColor.indexOf("#") > -1) {
                // If the color is a hexcode
                colorPicker.color.hexString = currentColor;
            } else {
                // If color is a color name like "white"
                // We convert it to hex (function in colorutils.js)
                currentColor = colourNameToHex(currentColor);
                colorPicker.color.hexString = currentColor;
            }
            // Now, whenever the colorpicker color changes, we
            // need to change the object fill color accordingly
            colorPicker.on(["color:init", "color:change"], function(color) {
                var pickerColor = colorPicker.color.hexString;
                canvas.getActiveObject().set("fill", pickerColor);
                canvas.renderAll();
            });
            // return obj.target.fill
        }
    }
}, false);
