// strict mode to prevent errors and enable some ES6 features
"use strict";
// Dropdown menu handling, show/hide based on menu state, and other things

/* 
 * Note to the lucky soul reading this comment - the utter existence
 * of this library is a procurement of the dark arts. It took me ages
 * to finish this, likely selling half of my soul to the developers of
 * javascript in the process. Everything in here was crafted, then destroyed,
 * then rewritten, then perfected, and then destroyed again in an endless
 * cycle of fire and blood. I pity you, for I shall hope you need not ever
 * repeat this experience. Good luck.
 */


// Entering: "transition ease-out duration-100"
//   From: "transform opacity-0 scale-95"
//   To: "transform opacity-100 scale-100"
// Leaving: "transition ease-in duration-75"
//   From: "transform opacity-100 scale-100"
//   To: "transform opacity-0 scale-95"

// File menu implementation
// wrap things in an IIFE to keep them neatly isolated from other code.
let createFileDropDown = (function() {

            // API should be like this:
            // createMenuDropDown("fileMenu", "newDrawing", "New illustration")
            // ==> Creates a dropdown item in fileMenu with an ID of newDrawing and a title of "New illustration"

            // Create list of top-level menus
            // Here the list is of the IDs not of the actual labels
            let topLevelMenuIDs = ["fileButton", "editButton", "formatButton", "prefsButton", "developerButton", "aboutButton"];

            // Create definitions for each menu item
            //  Menu bar elements are the buttons/items in a dropdown
            // In the file menu there are 12 of them! And in total
            // there might be thirty or more!

            // Each menu bar element has an id as well as a label, represented as an object
            // The ID is the unique JavaScript id of the element, while the label is the the text displayed for that particular element on the user interface
            // These have to be kept separate because ID names are often short for verbose code
            // while label names have spaces for readability
            let newDrawingButton = {
                menu: "fileMenu",
                id: "newDrawing",
                label: "New illustration",
                tooltip: "Creates a blank new drawing",
                keybinding: "CTRL N"
            };
            let importDrawingButton = {
                menu: "fileMenu",
                id: "importDrawing",
                label: "Import",
                tooltip: "Imports a SVG file, Fabric.js JSON or PNG"
            };
            let exportDrawingButton = {
                menu: "fileMenu",
                id: "exportDrawing",
                label: "Export",
                tooltip: "Exports a PNG, JPG, or SVG"
            };
            let openFileButton = {
                menu: "fileMenu",
                id: "openFile",
                label: "Open file"
            };
            let openRecentFileButton = {
                menu: "fileMenu",
                id: "openRecentFile",
                label: "Open recent file"
            };
            let restoreLastSessionButton = {
                menu: "fileMenu",
                id: "restoreLastSession",
                label: "Restore last session"
            };
            let saveFileButton = {
                menu: "fileMenu",
                id: "saveFile",
                label: "Save file"
            };
            let saveFileAsButton = {
                menu: "fileMenu",
                id: "saveFileAs",
                label: "Save file as"
            };
            let renameFileButton = {
                menu: "fileMenu",
                id: "renameFile",
                label: "Rename file"
            };
            let settingsButton = {
                menu: "fileMenu",
                id: "adjustSettings",
                label: "Settings"
            };
            let reloadUIButton = {
                menu: "fileMenu",
                id: "reloadUITrigger",
                label: "Reload UI"
            };
            let quitButton = {
                menu: "fileMenu",
                id: "quitTrigger",
                label: "Quit"
            };
            let forceQuitButton = {
                menu: "fileMenu",
                id: "forceQuitTrigger",
                label: "Force quit"
            };
            let tempOtherButton = {
                menu: "otherMenu",
                id: "tempOther",
                label: "Random menu item"
            }

            // Usage: createMenuDropDown(id of menu: str) => returns HTML element
            function createMenuDropDown(menuID) {
                // The dropDownContainer is the top-level div that
                // houses all of the rest of the dropdown code
                let dropDownContainer = document.createElement("div");
                dropDownContainer.className = "absolute z-50 mt-2 text-sm origin-top-left border divide-y rounded-md shadow-lg w-60 -left-8 top-6 font-base divide-darkgray bg-deepgray border-darkgray"

                // The 12 file dropdown menu items are combined here
                // into one big array called menuBarElements
                switch (menuID) {
                    case "fileButton":
                        // Do something
                        break;
                };

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
                    generatedVariable.className = "block py-2 pl-8 pr-4 text-sm text-gray-100";

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

                    // Finish!
                    return dropDownContainer;

                    // E.g. append the completed file dropdown to the "file" menu
                    // document.getElementById("fileButton").parentNode.appendChild(dropDownContainer);
                });
            });

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

        // for (buttonID in topLevelMenuIDs) {
        //     createFileDropDown(buttonID);
        // }

        // Note that the force quit button shows you a dialogue asking you if you really want to force quit
        // For the "true" instant kill switch for Vecternary, use the keyboard command CTRL + B + K + F and hold for 3 seconds


        // Some event delegation to catch events

        // menuRoot is the catcher for events; it corresponds to the <nav>
        // DOM element in the markup
        var menuRoot = document.getElementById("menuRoot"); menuRoot.addEventListener("click", function(event) {
            let target = event.target;
            let targetID = target.id;
            let targetParent = target.parentNode;
            // Though this is not entirely necessary,
            // I set it to verify that the returned ID would
            // be one of the 6 menus hard-coded in the HTML
            // and to warn by a toast if that isn't the case
            if (targetID in topLevelMenuIDs === false) {
                // The error names are based on the dates they were made
                // Error 815 was created on August 15, 2021 which gives it that name
                log("Error 815: invalid dropdown ID received!")
                throw new console.warn(`Dropdown id ${targetID} is invalid!`);
            };
            // Creates the menu markup BUT we don't show that markup yet!
            let dropDownMarkup = createMenuDropDown(targetID);
            // Handle the logic of opening, closing, and enter/leave transitions
            // They show on both hover and focus
            targetParent.appendChild(dropDownMarkup);
        });