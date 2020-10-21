/**
 * @name wolf-new-guild.js
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

    bot.on("guildMemberAdd", function(mem) {

    })
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 2,
    pluginType: "PLUGIN",
    name: "cult-bypass-member+",
    enabled: true
}