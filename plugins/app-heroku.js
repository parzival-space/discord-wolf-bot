/**
 * @name app-heroku.js
 * @description Dieses Plugin ermöglicht es der Anwendung permanent aktiv zu bleiben.
 * @author Parzival
 * @version 1.0.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const express = require('express');
const app = express();

/**
 * @description Einstiegspunkt des Plugins
 */
module.exports.run = function() {

    // Erstellt ein einfachen Website listener.
    app.get('*', (req, res) => {
        var response = "<html><head><title>app-heroku.js</title><style>body, html {padding: 0;margin: 0;width: 100%;height: 100%;overflow: hidden;}* {font-family: monospace;color: white;background-color: black;}body {margin-left: 5px;}</style></head><body><h1>plugins/app-heroku.js</h1><p>All requests are processed by the app-heroku.js plugin.</p><p>When this is not the desired effect, please check the installed plugins.</p><p>raccoon-heroku.js overwrites all created request handlers by default.</p></body></html>";
        res.send(response);
    });

    // Startet den gefakten WebServer
    app.listen(80);
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 1,
    pluginType: "OVERWRITE",
    name: "app-heroku"
}