# VBundler

The bundler component of Vecternary is a lightweight optimizer that merges the `index.html` and all of its associated assets into one file, ready for the Rust application shell to use.

## Info

VBundler is very lightweight as it is written in C++ (though I might port it to Rust if I have the time to). It is built to be reliable and error-free, yet also be efficient. Best practices of bundling are all supported:

- Removing [unused JavaScript](https://web.dev/unused-javascript/)
- [Optimizing existing code](https://web.dev/fast/)
- Checking for render-blocking CSS and JS
- Removing [unused CSS rules](https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/)
- Checking for and preventing FOUC
- Running [optimizations on CSS](https://cssnano.co/)
- Speeding up first content paint and largest content paint speeds

## Why not Webpack?

Because Webpack is good for big projects. Not for small projects. It introduces far more dependencies than I would like.

## Overview

VBundler works by removing dead code and by performing optimizations on pre-existing code. While code size in development can reach up to a whopping megabyte (!) in total (including all javascript and CSS assets), Vecternary ships with less than a quarter of that - thanks to VBundler. Additionally, it is minimally intrusive, and doesn't remove any code that might still be useful.

VBundler's implementation of an asset packer works like this:
* It tranverses the source tree to find the necessary files referenced in code
	* It identifies which areas of code are not used (both CSS and JS) and removes them
