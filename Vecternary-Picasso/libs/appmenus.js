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

// Menu API:
// Each menu bar element has an id as well as a label, represented as an object
// The ID is the unique JavaScript id of the element, while the label is the the text displayed for that particular element on the user interface
// These have to be kept separate because ID names are often short for verbose code
// while label names have spaces for readability

let appMenu = [{
    role: "fileMenu",
    submenu: [
        [
            {
                label: "New illustration",
                id: "newDrawing",
                keybinding: "CTRL N",
                tooltip: "Creates a blank new drawing"
            },
            {
                label: "Import",
                id: "importDrawing",
                keybinding: "SHIFT I",
                tooltip: "Imports a SVG file, Fabric.js JSON or PNG"
            },
            {
                label: "Export",
                id: "exportDrawing",
                keybinding: "SHIFT E",
                tooltip: "Exports a PNG or SVG"
            }
        ],
        [
            {
                label: "Open file",
                id: "openFile",
                keybinding: "CTRL O"
            },
            {
                label: "Save file",
                id: "saveFile",
                keybinding: "CTRL S"
                // This only has to be done for the 1st time
                // Once the file is saved as a .vect file
                // at a local directory the first time
                // autosaving kicks into action, so
                // every next time pressing CTRL S will
                // just show a toast that says something like
                // "Autosaving saves for you! ;)"
                // Future TODO: If user is working on a blank
                // new illustration and doesn't save after a while,
                // alert them!
            }
        ],
        [
            {
                label: "Quit",
                id: "quitTrigger",
                keybinding: "CTRL Q"
            }
        ],
        [
            {
                label: "Force quit",
                id: "forceQuit",
                keybinding: "CTRL K Q"
                // Note that the force quit button shows you a dialogue asking you if you really want to force quit
                // For the "true" instant kill switch for Vecternary, use the keyboard command CTRL + B + K + F and hold for 3 seconds
            }
        ]
        // We will temporarily leave out these options from the file menu:
        // - Open recent file
        // - Restore last session
        // - Rename file
        // - Settings
        // - Reload UI
    ]
}, {
    role: "editMenu",
    submenu: [
        // Temporarily left-out options:
        // - Select all
        // - Deselect all
        // - Select inverse
        // - Select by type
        // - Command palette
        [
            {
                label: "Undo",
                id: "undoTrigger",
                keybinding: "CTRL Z"
            },
            {
                label: "Redo",
                id: "redoTrigger",
                keybinding: "CTRL SHIFT Z"
            }
        ],
        [
            {
                label: "Copy",
                id: "copyTrigger",
                keybinding: "CTRL C"
            },
            {
                label: "Paste",
                id: "pasteTrigger",
                keybinding: "CTRL V"
            },
            {
                label: "Duplicate",
                id: "duplicateTrigger",
                keybinding: "SHIFT D"
            }
        ],
        [
            {
                label: "Zoom in",
                id: "zoomIn",
                keybinding: "SHIFT 0",
            },
            {
                label: "Zoom out",
                id: "zoomOut",
                keybinding: "SHIFT 9"
            },
            {
                label: "Default zoom",
                id: "zoomDefault",
                keybinding: "SHIFT 0 9"
            }
        ]
    ]
}, {
    role: "arrangeMenu",
    submenu: [
        [
            {
                label: "Send to top",
                id: "sendToTop",
                keybinding: "SHIFT T T"
            },
            {
                label: "Send 1 level up",
                id: "sendOneUp",
                keybinding: "SHIFT T"
            },
            {
                label: "Send 1 level down",
                id: "sendOneDown",
                keybinding: "SHIFT D"
            },
            {
                label: "Send to bottom",
                id: "sendToBottom",
                keybinding: "SHIFT D D"
            }
        ]
    ]
}, {
    role: "prefsMenu",
    submenu: [
        [
            {
                label: "Full screen",
                id: "fullScreenTrigger",
                keybinding: "CTRL F"
            },
            {
                label: "Open config",
                id: "openPrefsFile",
                keybinding: "CTRL O C"
            }
            // Items temporarily not added
            // Zen mode
            // Show guides
            // Show grid
            // Enable snapping
            // Add plugins
            // Customize keyboard shortcuts
        ]
    ]
}, {
    role: "developerMenu",
    submenu: [
        [
            // Items temporarily not added
            // Open inspector
            // Debugger
            // Errors stacktrace
            // Developer extras
            // App console
            {
                label: "Run local script",
                id: "runCustomScriptTrigger",
                keybinding: "CTRL SHIFT R"
            },
            {
                label: "Show logs",
                id: "showLogsTrigger",
                keybinding: "SHIFT S L"
            }
        ]
    ]
}, {
    role: "aboutMenu",
    submenu: [
        [
            // Items temporarily not added
            // Report issue
            // Interface guide
            // Full documentation
            // Github
            // License
            // Privacy & Security
            // Search help...
            {
                label: "About",
                id: "aboutTrigger",
                keybinding: ""
            }
        ],
        [
            {
                label: "Quick start",
                id: "quickStartTrigger",
                keybinding: ""
            }
        ]
    ]
}];


// Entering: "transition ease-out duration-100"
//   From: "transform opacity-0 scale-95"
//   To: "transform opacity-100 scale-100"
// Leaving: "transition ease-in duration-75"
//   From: "transform opacity-100 scale-100"
//   To: "transform opacity-0 scale-95"

function createMenu(menuObject) {
    let menu = generateElement(`<div data-menu-name="${menuObject.role}" class="absolute -left-8 top-6 w-full mt-2 origin-top-left rounded-md shadow-lg w-60 md:w-52 z-30 font-base text-sm divide-y divide-darkgray bg-deepgray border-darkgray border transition ease-out duration-300"></div>`);
    let menuDropdownItems = menuObject.submenu;
    menuDropdownItems.forEach(function (element) {
        // Deal with groups
        let menuDropdownGroup = generateElement(`<div class="py-1"></div>`);
        element.forEach(function (subelement) {
            let tooltip = "";
            if (isInObject("tooltip", subelement)) {
                tooltip = subelement.tooltip;
            }
            let menuDropDownItem = generateElement(`
            <a href="#" class="text-gray-100 block pl-8 pr-4 py-2 text-sm" role="menuitem" id="${subelement.id}" data-tooltip="${tooltip}">
                <div class="flex flex-row justify-between">
                    <label for="${subelement.id}">${subelement.label}</label>
                    <div class="block opacity-50">
                        <kbd class="leading-wide font-sans text-xs text-gray-100 rounded-md p-1">${subelement.keybinding}</kbd>
                    </div>
                </div>
            </a>`);
            menuDropdownGroup.appendChild(menuDropDownItem);
        })
        // Append groups to menu dropdown
        menu.appendChild(menuDropdownGroup);
    })
    // Finally append the menu dropdown to the main menu
    return menu;
}

// Add each dropdown menu to the big main menu
appMenu.forEach(function (element) {
    let dropDown = createMenu(element);
    // We want to make the dropdown hidden by default
    dropDown.classList.add("hidden")
    let dropDownID = dropDown.dataset.menuName;
    let dropDownParent = document.getElementById(dropDownID).parentElement;
    dropDownParent.appendChild(dropDown)
})

let dropDownTriggers = ["fileMenu", "editMenu", "arrangeMenu", "prefsMenu", "developerMenu", "aboutMenu"]

// Show the dropdowns on click
// Should be refactored with info from https://sebastiandedeyne.com/javascript-framework-diet/dropdowns/
dropDownTriggers.forEach(function(element){
    let dropDown = document.getElementById(element).parentElement.lastChild;
    document.getElementById(element).onclick = function(){
        // If the dropdown menu is not visible
        if (dropDown.classList.contains("hidden")) {
            // Then we make it visible
            dropDown.classList.remove("hidden");
            // If the dropdown menu is visible
        } else {
            // Then we hide it and make it invisible
            dropDown.classList.add("hidden")
        }
    }
    // If focus to the dropdown menu is lost
    document.getElementById(element).onblur = function() {
        // Then we hide the dropdown menu as well
        dropDown.classList.add("hidden")
    }
})