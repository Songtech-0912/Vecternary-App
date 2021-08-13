case "fileButton":
    // Create a nested array
    // with the ids and labels of each button in the menu
    let fileMenuElements = [];
    // Nested arrays are composed of three elements:
    // the first element is the ID of the element
    // the second element is the HTML-displayed LABEL of the element
    // the third element is the tooltip displayed for the menu item
    // An optional forth element can be programmically added to the nested array
    // as another nested sublist e.g. for submenus in a menu
    fileMenuElements = [firstGroupElements, secondGroupElements, thirdGroupElements, forthGroupElements, fifthGroupElements]
    firstGroupElements[0] = ["newDrawing", "New drawing", "This is the tooltip label"]
    firstGroupElements[1] = ["importDrawing", "Import", "This is the tooltip label"]
    firstGroupElements[3] = ["exportDrawing", "Export", "This is the tooltip label]
    
    secondGroupElements[0] = ["openFile", "Open file", "This is the tooltip label"]
    secondGroupElements[1] = ["openRecentFile", "Open recent file", "This is the tooltip label"]
    secondGroupElements[2] = ["restoreLastSession", "Restore last session", "This is the tooltip label"]
    // We can use fileMenuElementssecondGroupElements].push[["firstSubItem", "Subitem 1", "tooltip"], ["secondSubItem"...]] to add a nested list to the last session group e.g. for a list of last opened files
    
    thirdGroupElements[0] = ["saveFile", "Save", "This is the tooltip label"]
    thirdGroupElements[1] = ["saveFileAs", "Save as", "This is the tooltip label"]
    thirdGroupElements[2] = ["renameFile", "Rename file", "This is the tooltip label"]
    
    forthGroupElements[0] = ["settings", "Settings", "This is the tooltip label]
    forthGroupElements[1] = ["reloadUI", "Reload UI", "This is the tooltip label"]
    
    fifthGroupElements[0] = ["quit", "Quit", "This is the tooltip label"]
    fifthGroupElements[1] = ["forceQuit", "Force quit", "This is the tooltip label"]
    fileMenuMarkup = `<div id="fileButton">File</div>`
    fileMenuMarkup.class = "absolute -left-8 top-6 w-full mt-2 origin-top-left rounded-md shadow-lg w-60 md:w-52 z-30 font-base text-sm divide-y divide-darkgray bg-deepgray border-darkgray border transition ease-out duration-300 hidden"
    for (menuItem in fileMenuElements) {
        menuItemMarkup = `<a href="#" role="menuitem" tabindex="-1">New drawing</a>`
        menuItemMarkup.class = "text-gray-100 block pl-8 pr-4 py-2 text-sm"
        // JS ID
        menuItemMarkup.id =  menuItem[0]
        // Label
        menuItemMarkup.innerText =  menuItem[1]
        // Tooltip data attribute
        menuItemMarkup.data.tooltip =  menuItem[1]
    }
