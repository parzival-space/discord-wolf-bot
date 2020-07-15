/**
 * @name colors.js
 * @description Überschreibt die farblose Standartausgabe mit einem Format welches Farbe nutzt.
 * @author Parzival
 * @version 1.0.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const colors = require('colors');

/**
 * @description Einstiegspunkt des Plugins
 */
module.exports.run = function() {
    // Erstelle ein Backup des alten STD:OUT.
    var alt = {
        info: console.info,
        debug: console.debug,
        trace: console.trace,
        log: console.log,
        error: console.error,
        warn: console.warn
    }

    function ConvertInput(...data) {
        var out = "";
        data.forEach((d, i) => {
            out = out + d;
            if (i != (data.length - 1)) out = out + "\n";
        })
        return out;
    }

    // Überschreibt die orginale STD:OUT
    console.info = function(...data) { alt.info(colors.green(ConvertInput(data))); }
    console.debug = function(...data) { alt.debug(colors.blue(ConvertInput(data))); }
    console.trace = function(...data) { alt.trace(colors.cyan(ConvertInput(data))); }
    console.log = function(...data) { alt.log(colors.green(ConvertInput(data))); }
    console.error = function(...data) { alt.error(colors.red(ConvertInput(data))); }
    console.warn = function(...data) { alt.warn(colors.yellow(ConvertInput(data))); }

    // Bestätige laden des Plugins
    //console.info("Colors successfully injected.");
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 1,
    pluginType: "PLUGIN",
    name: "colors"
}