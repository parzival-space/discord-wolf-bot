const DiscordJS = require('discord.js');

/**
 * @description Dieser Befehl ist nur zum Testen des Permissions Modul vorhanden
 * @author Parzival
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {

    return msg.channel.send("OK!");

};

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Befehls bereit. 
 */
module.exports.help = {
    name: 'testperms',
    description: 'Testing your Permissions?',
    args: '[number]',
    hidden: true,
    permissions: [
        "ADMINISTRATOR"
    ]
};