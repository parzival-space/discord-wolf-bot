/**
 * @name wolf-new-guild.js
 * @description Dieses Plugin sorgt dafür das der Bot sich bei allen vorstellt wenn er einem Server beitritt.
 * @author Parzival
 * @version 1.0.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const DiscordJS = require('discord.js');

/**
 * @description Einstiegspunkt des Plugins
 * @param {DiscordJS.Client} bot
 */
module.exports.run = function(bot) {

    // Als erstes muss eine Event welches beim beitreten ausgelöst wird abgefragt werden.
    bot.on("guildCreate", (guild) => {
        // Der Bot ist einem Server Beigetreten
        // INFO: Der Bot löscht die Server.Konfiguration sollte bereits eine für diesen Server vorhanden sein.

        // Löscht eventuelle Server-Konfigurationen
        // Wenn keine vorhanden ist wird eine neue erstellt.
        bot.resetGuildConfig(guild);
    })
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 2,
    pluginType: "PLUGIN",
    name: "wolf-new-guild",
    enabled: true
}