"use strict";

// Author: @Songtech-0912
// Provides toasts functionality

function log(value) {
    clearTimeout(log.timer);
    if (toast.hidden) toast.textContent = value;
    else toast.textContent += '\n' + value;
    // Change toast type to warning if keyword "error" is within value
    toast.className = String(value).match(/error/i) ? 'error' : '';
    toast.hidden = false;
    log.timer = setTimeout(() => {
        toast.hidden = true;
    }, 1000);
}