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
    bot.on("message", async (msg) => {
        if (msg.author.id != bot.user.id){
            if (msg.channel.id=="758083270943703101") {
                var msgs = await (await msg.channel.messages.fetch({limit: 2})).array();
                var oldMsg = msgs.pop();
                var newMsg = msgs.pop();
    
                var oldNumber = Number(oldMsg.content.split(' ')[0]) || -1;
                var newNumber = Number(newMsg.content.split(' ')[0]) || -1;
    
                if (oldNumber != (newNumber - 1)) {
                    msg.delete().catch();
                    /*msg.channel.send("!warn <@!" + msg.author.id + "> Can't count!").then(asr => {
                        asr.delete({timeout: 750}).catch();
                    }).catch();*/
                }
            }
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