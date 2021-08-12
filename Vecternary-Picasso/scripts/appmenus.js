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
function toggleMenu(item, dropdown) {
    document.getElementById(item).onclick = function() {
        var el = document.getElementById(dropdown);
        // If the dropdown menu is not visible
        if (el.classList.contains("hidden")) {
            // Then we make it visible
            el.classList.remove("hidden");
            // If the dropdown menu is visible
        } else {
            // Then we hide it and make it invisible
            el.classList.add("hidden")
        }
        // If focus to the dropdown menu is lost
        document.getElementById(item).onblur = function() {
            // Then we hide the dropdown menu as well
            el.classList.add("hidden")
        }
    }

}