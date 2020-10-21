/**
 * @name cult-rainbow-role.js
 * @description Stellt einen Membercounter bereit.
 * @author Parzival
 * @version 1.0.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const DiscordJS = require('discord.js');

/**
 * @description Einstiegspunkt des Plugins
 * @param {DiscordJS.Client} bot
 */
module.exports.run = function (bot) {

    bot.on("ready", () => {
        var cult = bot.guilds.cache.find(g => g.id === "751734515420102737");
        var role = cult.roles.cache.find(r => r.id === "768382603379998720");
        var delay = 1000;
        var colors = [
            "#FF0000",
            "#FFA500",
            "#FFFF00",
            "#008000",
            "#0000FF",
            "#4B0082",
            "#EE82EE"
        ];

        if (cult == undefined) return;
        console.log(`Detected Server: ${cult.name}`);

        if (role == undefined) return;
        console.log(`Detected Role: ${role.name}`);

        var stage = 0;
        var doRainbow = setInterval(function() {
            if (stage + 1 === colors.length) stage = 0;
            var currentColor = colors[stage];

            role.setColor(currentColor, "Do da rainbow boii!").catch();

            stage++;
        }, delay);
    });
};

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 2,
    pluginType: "PLUGIN",
    name: "cult-rainbow-role",
    enabled: true
}