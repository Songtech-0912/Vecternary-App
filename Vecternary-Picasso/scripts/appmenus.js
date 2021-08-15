// strict mode to prevent errors and enable some ES6 features
"use strict";
// Dropdown menu, show/hide based on menu state.

// Entering: "transition ease-out duration-100"
//   From: "transform opacity-0 scale-95"
//   To: "transform opacity-100 scale-100"
// Leaving: "transition ease-in duration-75"
//   From: "transform opacity-100 scale-100"
//   To: "transform opacity-0 scale-95"

// toggleMenu function
// item is the header menu item
// dropdown is the dropdown menu associated with the menu item
// function toggleMenu(item, dropdown) {
//     document.getElementById(item).onclick = function() {
//         var el = document.getElementById(dropdown);
//         // If the dropdown menu is not visible
//         if (el.classList.contains("hidden")) {
//             // Then we make it visible
//             el.classList.remove("hidden");
//             // If the dropdown menu is visible
//         } else {
//             // Then we hide it and make it invisible
//             el.classList.add("hidden")
//         }
//         // If focus to the dropdown menu is lost
//         document.getElementById(item).onblur = function() {
//             // Then we hide the dropdown menu as well
//             el.classList.add("hidden")
//         }
//     }
// 
// }

// File menu implementation
// wrap things in an IIFE to keep them neatly isolated from other code.
let createFileDropDown = (function() {

    // The dropDownContainer is the top-level div that
    // houses all of the rest of the dropdown code
    let dropDownContainer = document.createElement("div");
    dropDownContainer.className = "absolute -left-8 top-6 w-full mt-2 origin-top-left rounded-md shadow-lg w-60 md:w-52 z-30 font-base text-sm divide-y divide-darkgray bg-deepgray border-darkgray border"

    // Menu bar elements are the buttons/items in a dropdown
    // In the file menu there are 12 of them!

    // Each menu bar element has an id as well as a label, represented as an object
    // The ID is the unique JavaScript id of the element, while the label is the the text displayed for that particular element on the user interface
    // These have to be kept separate because ID names are often short for verbose code
    // while label names have spaces for readability
    let newDrawingButton = {
        id: "newDrawing",
        label: "New illustration",
        tooltip: "Creates a blank new drawing"
    };
    let importDrawingButton = {
        id: "importDrawing",
        label: "Import",
        tooltip: "Imports a SVG file, Fabric.js JSON or PNG"
    };
    let exportDrawingButton = {
        id: "exportDrawing",
        label: "Export",
        tooltip: "Exports a PNG, JPG, or SVG"
    };
    let openFileButton = {
        id: "openFile",
        label: "Open file"
    };
    let openRecentFileButton = {
        id: "openRecentFile",
        label: "Open recent file"
    };
    let restoreLastSessionButton = {
        id: "restoreLastSession",
        label: "Restore last session"
    };
    let saveFileButton = {
        id: "saveFile",
        label: "Save file"
    };
    let saveFileAsButton = {
        id: "saveFileAs",
        label: "Save file as"
    };
    let renameFileButton = {
        id: "renameFile",
        label: "Rename file"
    };
    let settingsButton = {
        id: "adjustSettings",
        label: "Settings"
    };
    let reloadUIButton = {
        id: "reloadUITrigger",
        label: "Reload UI"
    };
    let quitButton = {
        id: "quitTrigger",
        label: "Quit"
    };
    let forceQuitButton = {
        id: "forceQuitTrigger",
        label: "Force quit"
    };

    // The 12 file dropdown menu items are combined here
    // into one big array called menuBarElements
    let menuBarElements = [
        newDrawingButton,
        importDrawingButton,
        exportDrawingButton,
        openFileButton,
        openRecentFileButton,
        restoreLastSessionButton,
        saveFileButton,
        saveFileAsButton,
        renameFileButton,
        settingsButton,
        reloadUIButton,
        quitButton,
        forceQuitButton
    ];

    // Menu bar groups are a container that contains several menu items -
    // they are separated from each other by a divider visually
    // There are 5 such groups in the file dropdown, some have less, some have none at all
    let firstGroup = [
        newDrawingButton,
        importDrawingButton,
        exportDrawingButton
    ];
    let secondGroup = [
        openFileButton,
        openRecentFileButton,
        restoreLastSessionButton
    ];
    let thirdGroup = [
        saveFileButton,
        saveFileAsButton,
        renameFileButton,
    ];
    let forthGroup = [
        settingsButton,
        reloadUIButton,
    ];
    let fifthGroup = [
        quitButton,
        forceQuitButton
    ];
    let menuBarGroups = [firstGroup, secondGroup, thirdGroup, forthGroup, fifthGroup];

    // We use this array to store the menu item variables
    // before we designate them to specific groups
    let menuTempContainer = [];

    // We create the HTML markup for each of the menu items
    menuBarElements.forEach(function(element) {
        // Generate a new variable name as a STRING
        // This is JUST the name, the generated variable
        // doesn't exist yet!
        let tempVariableName = "var_" + element["id"];
        // To actually make the generated variable exist it has 
        // to be linked with the window object
        // The window[] notation converts strings to the
        // matching variables of the same name
        // E.g. window['hello'] would return the variable $hello

        // A way to think of this is that generatedVariable
        // is basically like a pointer to the dynamically
        // generated variable

        // So if the dynamically generated variable
        // was named $var_newDrawing then generatedVariable
        // would act as a pointer to $var_newDrawing
        let generatedVariable = window[tempVariableName];
        generatedVariable = document.createElement("a");
        generatedVariable.innerText = element["label"];
        generatedVariable.id = element["id"];
        // TODO This checking for whether the tooltip key
        // exists should be removed in the future once the tooltips
        // have all been written down
        if (element.hasOwnProperty("tooltip")) {
            generatedVariable.dataset.toolip = element["tooltip"];
        }

        /* TailwindCSS classes to style the menu buttons */
        generatedVariable.className = "text-gray-100 block pl-8 pr-4 py-2 text-sm";

        // This produces the code to generate the dynamic variable
        // E.g. it might produce: let var_quitTrigger_Generated = menuElement;
        // let generatedVariable = "var_" + element["id"];
        menuTempContainer.push(generatedVariable);
    });

    // We sort each of the menu items into groups
    // and append the child elements to the group markup
    menuBarGroups.forEach(function(element) {
        // As stated previously each group is a <div>
        // that contains several menu item buttons
        let groupMarkup = document.createElement("div");
        groupMarkup.className = "py-1";
        // Each group contains several buttons with
        // HTML markup we added previously so
        // we need to add it to the group markup
        // as well
        menuTempContainer.forEach(function(groupItemNode) {
            let tempGroupItemID = groupItemNode.id; // e.g. var_newDrawing => newDrawing
            tempGroupItemID.replace("var_", "");
            // element = [newDrawingButton, importDrawingButton, ...]
            // so we loop over it
            element.forEach(function(elementButton) {
                let elementButtonID = elementButton.id;
                if (elementButtonID == tempGroupItemID) {
                    groupMarkup.appendChild(groupItemNode);
                }
            })
        });
        // Append the completed group to the top-level dropdown container
        dropDownContainer.appendChild(groupMarkup);

        // E.g. append the completed file dropdown to the "file" menu
        document.getElementById("fileButton").parentNode.appendChild(dropDownContainer);
    });
})();

// Note that the force quit button shows you a dialogue asking you if you really want to force quit
// For the "true" instant kill switch for Vecternary, use the keyboard command CTRL + B + K + F and hold for 3 seconds


// Some event delegation to catch events

// menuRoot is the catcher for events; it corresponds to the <nav>
// DOM element in the markup
var menuRoot = document.getElementById("menuRoot");
menuRoot.addEventListener("click", function(event) {
    let target = event.target;
    let targetID = target.id;
    let targetParent = target.parentNode;
    console.log(targetID);
    // We now render a different menu dropdown
    // depending on which menu button was clicked

    // switch (targetID) {
    //     case "fileButton":
    //         // takes the menu title and turns it into a block of markup
    //         targetParent.append(fileMenuMarkup);
    //         break;
    //     case "editButton":
    //         targetParent.append(editMenuMarkup);
    //         break;
    //     default:
    //         console.log("Not a filebutton")
    // }




});