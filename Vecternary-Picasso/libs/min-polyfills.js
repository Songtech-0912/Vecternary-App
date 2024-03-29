// Polyfill for forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach =
      function (callback, thisArg) {
        thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
}