# Vecternary Development Overview

A quick overview of how Vecternary is developed.

## Guiding Principles

### Simplicity counts

### User-friendly UI

Vecternary's UI should be implemented 

### Keeping dependencies to a minimum

Vecternary is incredibly light because its dependencies are absolutely minimal. With a fully bundled release size of 3.8 MB, we can't afford to use whatever packages we want. Vecternary also has to be self-contained, so all of its libraries have to be embedded and portable. That means that, as much as possible, libraries are custom-written from scratch for Vecternary and made to be as lightweight as possible.

### Commented Code

Your source code is both your first and last source of documentation. It's always going to be the first updated, most up-to-date reference on how your software works, and the last hope for a developer to pick up an abandoned open-source project and revive it as their own. So you must document it well, keep it clean, and treat it as a work of art.

### Understandable Code > Clean Code

### Performance

### Accessibility

There is *no* average user. Every user is a unique person, and equally deserving to be able to use Vecternary.

Vecternary takes a no-excuses approach to accessibility. For this reason, Vecternary is very strict about the following:

* All features **must** be operable entirely via keyboard
* Vecternary should obey AAA+ contrast guidelines
* If a feature does not work (such as when JavaScript is disabled or the user's operating system has an older version of a browser), then the user **must** be made aware that the feature is disabled
* Toasts should not rely solely on a visual display; they should be evident to non-sighted users as well

### Progressive Enhancement

### Cross-Platform

### Performance > Features

Vecternary could have far more features than it has now. But instead of more features, it prioritizes on having no "un-features" - undesirable features that hinder user performance. One *un-feature* it doesn't have? The need to use a workstation with massive amounts of memory and a super-fast CPU. Vecternary is designed to work fast on even low-end hardware. As a general rule, it should never use above **30 MBs of memory in total**, and never exceed 5% CPU usage on an average MacBook from 8 years ago. It should never freeze, crash, or make an entire desktop unresponsive.

Improving performance in Vecternary comes down to three important steps:

* Using native (Rust) code
* Reducing intensive operations
* Carefully testing performance

First, and the most important way to improve performance, is to use native Rust functions to handle heavy functions. Vecternary runs on multiple threads, and always autosaves the user's work. When parsing large SVGs or `.vect` files, Vecternary always uses a separate thread to load and cache the SVG with Rust first, and then loading parts of the SVG, one at a time, to the canvas. The consequence is a slower SVG load time, but the advantage is that memory usage will not spike, and Vecternary's UI can remain completely responsive. If, in the rare case, a bug results in Vecternary suddenly causing the entire desktop to be unresponsive, another Rust thread will wait 5 seconds to save the results of the canvas, and then perform an automatic kill function.

Second, optimizing intensive operations is also essential. For instance, loading large files without consideration of how to optimize the loading process is going to seriously impact performance. Writing efficient javascript is doubly important. Following [performance best practices](https://www.keycdn.com/blog/javascript-performance) and using vanilla JavaScript methods and functions are essential, as well as a proper understanding of JavaScript performance enhancement. Tools like Google's [better JavaScript compiler](https://developers.google.com/closure/compiler/) and the built-in [browser devtools](https://developer.chrome.com/docs/devtools/evaluate-performance/) help massively in this regard.

While Rust is already a very fast language, it is also important to keep it as efficient as possible via writing each line of code with a focus on performance. All Rust code used must also follow Rust best practices for performance. No function should be used without due consideration to its impact on performance.

Last, performance testing is incredibly important. As much as possible, Vecternary intelligently warns its user when it is using too much memory, freezes, or crashes. It logs performance throughout running via a multithreaded Rust process, and displays performance data in realtime. Using tools like Lighthouse, to profile Vecternary is also very important.

### Simplicity Counts

Vecternary is not competing with the massive feature sets of big vector editors like Adobe Illustrator and Inkscape. Instead, its features are carefully implemented to work reliably and do exactly what you'd expect. Its role is not to replace the big guys in the vector application market - it is, and always will be, a unbloated and minimalist program.

### Community

## Code Structure
