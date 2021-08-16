window.onerror =
    function(msg, source, lineNo, columnNo, error) {
        alert("Error: " + msg +
            "\nScript: " + source +
            "\nLine: " + lineNo +
            "\nColumn: " + columnNo +
            "\nStackTrace: " + error);
        return true;
    };

var myalert = function() {
    alert(gfg);
};