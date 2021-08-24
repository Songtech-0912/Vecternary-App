# Vecternary Plan of Action

## Underlying Philosophy

The basic idea is to fix whatever is so broken that it causes functionality to be utterly unusable first. Then, we fix the things that are causing missing functionality and making it impossible to accomplish a certain task. Last, we add new features.

## Rates of Success

The approximate probability that all of the plan goals will be reached will likely not be extremely high. However,

## Backup Plan

The backup plan, assuming all fails, is to simply have a basic app to distribute with ability to open and save `.vect` files, import and export `.svg` files, and import/export `.png` files. Essentially, it will be just a glorified SVG file viewer with some basic editing functionality.

## Plan

- [x] First thing to fix is the markup - the current markup causes unresponsiveness and is hardly maintainable
    - [x] Temporarily delete the current `<noscript>` markup because it adds unnecessary clutter and leave it until later
    - [x] Use ::before rules to fix the sidebar icons, reference [here](https://icons.getbootstrap.com/#css) for how to do so
      - [x] Find a way to fix the issue of the icon SVGs not being embedded because they are externally linked
- [x] Use Firefox responsive design mode to make the UI completely responsive
  - [x] Use the responsive canvas method [already present here](https://codepen.io/songtech-0912/pen/wvdpEPz) to make the canvas auto-resize as well
- [x] Rewrite the right sidebar code, it is very unclear and causes frequent headaches
- [x] Then work on the multiselect color picker
- [ ] Then make all of the UI actually work and implement all basic functionality of the original freehand draw demo at <https://fabricjs.com/demos/freedrawing> - this is also going to be the time to add the new UI paradigm, see `Project-Tasklist.org:57` for implementation details
- [x] Delete, copy, paste, and duplicate objects should be implemented
- [x] Next work on the menu and menu dropdowns
  - [ ] Implement the menu functions in `app.js` (e.g. about modal will correspond to a `showAboutModal()` function in `app.js` that is triggered on the click as well as bound to its keybinding with `Mousetrap.js`)
  - [ ] Optional: enter-leave transitions for the dropdowns
- [ ] Next work on opening, saving, autosaving, and closing with the [rfd](https://lib.rs/crates/rfd) crate, as well as the keyboard shortcuts for each - add [this](https://github.com/michaelhue/keyscss) as well
    - [ ] Maybe while each file is loading display a fun little loading animation
- [ ] Add in SVG import/export as well as PNG import/export
  - [ ] For more efficient PNG/SVG import we will be using `fabric.Image.fromURL('/assets/some_pic.png')` instead of using Base64-encoded images
- [ ] Make a demo file for vecternary as well as making a welcome (blank state) screen
- [ ] Make a super basic auto error/warning logging system that writes it to `~/vecternary.log`
- [ ] Make inputs outlined in red if an invalid input is detected and remember the last used input
- [ ] Full width canvas
- [ ] Design `.vect` file type icon
- [ ] Show file save status if current illustration is not saved (the `*Unsaved` label in the titlebar or something)
- [ ] Linting and JavaScript cleanup
- [ ] Check that the javascript does not cause memory leaks
- [ ] Assuming that all of this is done, we lastly can add in any other new desirable features (such as a pen tool)
