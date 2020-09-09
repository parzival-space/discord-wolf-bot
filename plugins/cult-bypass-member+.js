/**
 * @name wolf-new-guild.js
 * @description Deaktiviert/Umgeht die Member+ Bot Nachricht.
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

    // Als erstes muss eine Event welches bei einer neuen Nachricht ausgelöst wird.
    /**
     * @param {DiscordJS.Message} msg
     */
    bot.on("message", (msg) => {
        if (msg.content.startsWith("+check")) {
            bot.once("message", (m) => {
                if (m.author.id == "631117170306449428") {
                    m.delete({ timeout: 0, reason: "Member+ Command bypass" }).catch(() => {});
                    msg.delete({ timeout: 0, reason: "Member+ Command bypass" }).then(() => {
                        msg.author.send("Sorry, but we disabled this command. Please use your Member+ Dashboard instead.\n - " + msg.guild.name + " Team").catch(() => {});
                    }).catch(() => {});
                }
            })
        }
    });
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